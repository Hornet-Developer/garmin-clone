import { throttle } from "lodash";
import { useEffect, useState } from "react";

export const useResizeW = () => {
  const [sizeW, setSize] = useState(0);

  useEffect(() => {
    const updateSize = throttle(function () {
      setSize(window.innerWidth);
    }, 200);
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return sizeW;
};
