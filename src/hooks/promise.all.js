const usePromise = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("no primise found"));
    }

    let results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve([]);
    }

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
