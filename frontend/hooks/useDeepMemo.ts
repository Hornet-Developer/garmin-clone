import { useEffect, useRef } from "react";

export function useDeepMemo(
  next: any,
  compare: (prev: any, next: any) => boolean
) {
  const previousRef = useRef();
  const previous = previousRef.current;
  const isEqual = compare(previous, next);
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });
  return isEqual ? previous : next;
}

export const compareIdCallback = (prev: any[], next: any[]) => {
  if (prev?.length !== next?.length) return false;
  return next.every((nextItem: any) =>
    prev.find((prevItem: any) => nextItem.id === prevItem.id)
  );
};
