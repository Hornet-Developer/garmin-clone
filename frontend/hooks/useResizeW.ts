import { throttle } from "lodash";
import { useLayoutEffect, useState } from "react";

export const useResizeW = () => {
  const [sizeW, setSize] = useState(0);

  useLayoutEffect(() => {
    const updateSize = throttle(function () {
      setSize(window.innerWidth);
    }, 200);
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return sizeW;
};
