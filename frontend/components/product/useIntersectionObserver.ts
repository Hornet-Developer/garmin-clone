import { useResizeW } from "hooks/useResizeW";
import { useMemo } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getObserver, initiateState } from "./helper";

export const useIntersectionObserver = (numItems: number) => {
  const nodesRef = useRef<HTMLLIElement[]>([]);
  const observer = useRef<IntersectionObserver>(null);
  const sizeW = useResizeW();

  const initialState = useMemo(() => initiateState(numItems), [numItems]);

  const [isActive, setisActive] = useState(initialState);

  const addNode = useCallback(
    (node: HTMLLIElement) => {
      if (nodesRef.current.length < numItems) nodesRef.current.push(node);
    },
    [nodesRef.current]
  );

  useEffect(() => {
    if (observer.current) observer.current?.disconnect();

    const newObserver = getObserver(observer, setisActive, initialState, sizeW);

    for (const node of nodesRef.current) {
      newObserver?.observe(node);
    }

    return () => {
      newObserver?.disconnect();
    };
  }, [sizeW]);

  return { isActive, addNode };
};
