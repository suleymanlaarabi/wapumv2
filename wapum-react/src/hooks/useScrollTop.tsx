import { RefObject } from "react";
import { useEventListener } from "./useEventListener";

export function useScrollTop<T extends HTMLElement>(
  containerRef: RefObject<T>,
  onScrollTopIsReached: () => void
): void {
  const checkIfScrollTopIsReached = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      if (scrollTop === 0) {
        onScrollTopIsReached();
      }
    }
  };

  useEventListener("scroll", containerRef, checkIfScrollTopIsReached);
}
