export const useDebounce = (callback, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(null, args);
    }, timeout);
  };
};
