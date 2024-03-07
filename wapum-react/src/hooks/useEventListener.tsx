import { RefObject, useEffect } from "react";

export function useEventListener<T extends HTMLElement>(
  eventType: string,
  containerRef: RefObject<T>,
  handler: (event: Event) => void
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener(eventType, handler);

      return () => {
        container.removeEventListener(eventType, handler);
      };
    }
  }, [eventType, containerRef, handler]);
}
