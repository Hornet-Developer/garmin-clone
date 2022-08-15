import { useEffect } from "react";
import { DispatchAction } from "types";

export const useOutsideClick = (
  elementRef: React.MutableRefObject<HTMLDivElement | null>,
  expectedRefElm: React.MutableRefObject<HTMLDivElement | null>,
  closeHandler: DispatchAction
) => {
  useEffect(() => {
    const handleClickOutiside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        expectedRefElm.current &&
        !elementRef.current.contains(event.target as Node) &&
        !expectedRefElm.current.contains(event.target as Node)
      ) {
        closeHandler && closeHandler(false);
      }
    };

    document.addEventListener("click", handleClickOutiside, true);
    return () => {
      document.removeEventListener("click", handleClickOutiside, true);
    };
  }, [elementRef]);
};
