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

export const compareObjectProps: (
  prev: { [key: string]: any },
  next: { [key: string]: any }
) => any = (prev, next) => {
  if (
    !prev ||
    Object.keys(prev).length === 0 ||
    !next ||
    Object.keys(next).length === 0
  )
    return;
  if (Object.keys(prev).length !== Object.keys(next).length) return false;
  return Object.entries(next).every((item) => next[item[0]] === prev[item[0]]);
};
