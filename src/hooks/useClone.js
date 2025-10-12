export const deepClone = (obj, hash = new WeakMap()) => {
  if (obj === null || typeof obj !== "object") return obj;

  // circular reference
  if (hash.has(obj)) return hash.get(obj);

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map) {
    return new Map(
      [...obj].map(([k, v]) => [deepClone(k, hash), deepClone(v, hash)])
    );
  }
  if (obj instanceof Set) {
    return new Set([...obj].map((v) => deepClone(v, hash)));
  }
  // functions are copied by reference
  if (typeof obj === "function") return obj;

  const cloneObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, cloneObj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return cloneObj;
};
