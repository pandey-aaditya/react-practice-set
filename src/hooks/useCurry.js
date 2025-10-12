export const useCurry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...next) => curried(...args, ...next);
    }
  };
};
