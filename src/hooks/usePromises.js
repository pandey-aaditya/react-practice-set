export const usePromises = (events = []) => {
  return events.reduce((current, next) => {
    return current.then(() => {
      return next().catch((err) => {
        console.error("Error in event:", err);
      });
    });
  }, Promise.resolve());
};
