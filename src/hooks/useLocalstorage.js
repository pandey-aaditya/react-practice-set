import { useEffect, useState, useCallback } from "react";

export const useLocalStorage = (
  keyName,
  defaultValue = null,
  eventName = "localstorage"
) => {
  // Initialize from localStorage safely
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value !== null) return JSON.parse(value);

      localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (error) {
      console.error("Error reading localStorage key:", keyName, error);
      return defaultValue;
    }
  });

  // Universal setter (supports function or value)
  const setValue = useCallback(
    (valueOrFn) => {
      try {
        const newValue =
          typeof valueOrFn === "function" ? valueOrFn(storedValue) : valueOrFn;

        localStorage.setItem(keyName, JSON.stringify(newValue));
        setStoredValue(newValue);

        // Dispatch a custom event so other hooks/components can sync
        window.dispatchEvent(
          new CustomEvent(eventName, {
            detail: { key: keyName, value: newValue },
          })
        );
      } catch (error) {
        console.error("Error setting localStorage key:", keyName, error);
      }
    },
    [keyName, storedValue]
  );

  // Sync across tabs (browser-native 'storage' event)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === keyName) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Error parsing storage event value:", error);
        }
      }
    };

    window.addEventListener(eventName, handleStorageChange);

    return () => {
      window.removeEventListener(eventName, handleStorageChange);
    };
  }, [keyName]);

  return [storedValue, setValue];
};
