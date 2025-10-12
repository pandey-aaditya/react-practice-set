import { useRef, useEffect } from "react";

export const usePolling = (callback, delay) => {
  if (typeof callback !== "function") {
    throw new Error("Callback must be a function.");
  }

  if (typeof delay !== "number" && delay !== null) {
    throw new Error("Delay must be a number or null.");
  }
  
  if (delay < 0) {
    throw new Error("Delay must be a non-negative number or null.");
  }

  const savedCallback = useRef();

  useEffect(() => {
    if (typeof callback !== "function") return;

    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      tick();
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
