export const usePipe = (...fns) => {
  return (value) => {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
};
