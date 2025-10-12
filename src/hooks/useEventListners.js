import { useEffect } from "react";

export const useEventListener = (eventName, handler, element) => {
  if (!eventName || !element || !handler) {
    throw new Error(
      "useEventListener requires an eventName, element and a handler function."
    );
  }

  if (typeof handler !== "function") {
    throw new Error("Handler must be a function.");
  }

  if (element && !(element instanceof HTMLElement)) {
    throw new Error("Element must be a valid HTML element.");
  }

  if (typeof eventName !== "string") {
    throw new Error("Event name must be a string.");
  }

  if (element && element.current && !(element.current instanceof HTMLElement)) {
    throw new Error("Element ref must point to a valid HTML element.");
  }

  useEffect(() => {
    const target = element?.current ?? window;
    if (!(target && target.addEventListener)) return;

    const eventListener = (e) => handler(e);
    target.addEventListener(eventName, eventListener);

    return () => {
      target.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
