import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

export const useAxios = (config = {}, autoFetch = true) => {
  const {
    url,
    method = "GET",
    data: body = null,
    params = null,
    headers = {},
  } = config;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const fetchData = useCallback(
    async (overrideConfig = {}) => {
      if (!url) {
        console.error("useAxios: 'url' is required");
        return;
      }

      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();

      try {
        const response = await axios({
          url,
          method,
          data: body,
          params,
          headers,
          signal: abortControllerRef.current.signal,
          ...overrideConfig,
        });

        setData(response);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.warn("Request cancelled:", url);
        } else {
          setError(err || `An error occured while requesting ${url}`);
          console.error("Axios error:", err);
        }
      } finally {
        setLoading(false);
      }
    },
    [url, method, body, params, headers]
  );

  useEffect(() => {
    if (autoFetch && url) fetchData();

    return () => abortControllerRef.current?.abort();
  }, [autoFetch, url]);

  return { data, loading, error, refetch: fetchData };
};
