import { RefObject } from "react";
import { useEventListener } from "./useEventListener";

export function useScrollBottom<T extends HTMLElement>(
  containerRef: RefObject<T>,
  onScrollBottomIsReached: () => void
): void {
  const checkIfScrollBottomIsReached = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight = containerRef.current.scrollHeight;
      const clientHeight = containerRef.current.clientHeight;
      if (scrollTop + clientHeight > scrollHeight - 80) {
        onScrollBottomIsReached();
      }
    }
  };

  useEventListener("scroll", containerRef, checkIfScrollBottomIsReached);
}
