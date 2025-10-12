import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

const apiClient = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const useFetch = (initialConfig = {}, options = {}) => {
  const { manual = false } = options;

  const controllerRef = useRef(null);

  const [state, setState] = useState({
    data: null,
    error: null,
    status: null,
    isFetching: false,
    isSuccess: null,

    phase: "idle",
    uploadProgress: 0,
    downloadProgress: 0,

    isCanceled: false,
  });

  const cancel = useCallback(() => {
    controllerRef.current?.abort();

    setState((prev) => ({
      ...prev,
      isFetching: false,
      phase: "idle",
      isCanceled: true,
    }));
  }, []);

  const fetchData = useCallback(
    async (overrideConfig = {}) => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setState({
        data: null,
        error: null,
        status: null,
        isFetching: true,
        isSuccess: null,

        phase: "uploading",
        uploadProgress: 0,
        downloadProgress: 0,

        isCanceled: false,
      });

      try {
        const response = await apiClient({
          signal: controller.signal,

          ...initialConfig,
          ...overrideConfig,

          headers: {
            ...(initialConfig.headers || {}),
            ...(overrideConfig.headers || {}),
          },

          onUploadProgress: (e) => {
            if (!e.total) return;

            const percent = Math.round((e.loaded * 100) / e.total);

            setState((prev) => ({
              ...prev,
              uploadProgress: percent,
              phase: percent === 100 ? "processing" : "uploading",
            }));
          },

          onDownloadProgress: (e) => {
            if (!e.total) return;

            const percent = Math.round((e.loaded * 100) / e.total);

            setState((prev) => ({
              ...prev,
              downloadProgress: percent,
              phase: "downloading",
            }));
          },
        });

        setState({
          data: response.data,
          error: null,
          status: response.status,
          isFetching: false,
          isSuccess: true,

          phase: "success",
          uploadProgress: 100,
          downloadProgress: 100,

          isCanceled: false,
        });

        return response.data;
      } catch (err) {
        if (err.name === "CanceledError") return;

        setState({
          data: null,
          error: err,
          status: err?.response?.status ?? null,
          isFetching: false,
          isSuccess: false,

          phase: "error",
          uploadProgress: 0,
          downloadProgress: 0,

          isCanceled: false,
        });

        throw err;
      }
    },
    [initialConfig],
  );

  useEffect(() => {
    if (!manual) fetchData();
    return () => controllerRef.current?.abort();
  }, [fetchData, manual]);

  return {
    ...state,
    refetch: fetchData,
    cancel,
  };
};
