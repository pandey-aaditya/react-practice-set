export const useThrottle = (callback, timeout = 500) => {
  let timer = null;
  let lastArgs = null;

  return (...args) => {
    if (!timer) {
      callback.apply(null, args);
      timer = setTimeout(() => {
        timer = null;
        if (lastArgs) {
          callback.apply(null, lastArgs);
          lastArgs = null;
        }
      }, timeout);
    } else {
      lastArgs = args;
    }
  };
};
