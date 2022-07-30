export const initiateState: (numItems: number) => {
  [key: string]: boolean;
} = (numItems: number) =>
  [...new Array(numItems)].reduce((acc, _, idx) => {
    acc[idx] = false;
    return acc;
  }, {});

const handler =
  (
    setisActive: React.Dispatch<
      React.SetStateAction<{
        [key: string]: boolean;
      }>
    >,
    initialState: { [key: string]: boolean }
  ) =>
  (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setisActive(() => ({
          ...initialState,
          [entry.target.id]: true,
        }));
      }
    }
  };

const options = (rootWidth: number) => {
  return {
    root: null,
    rootMargin: `0px -${rootWidth ? rootWidth / 2 - 40 : rootWidth}px`,
    threshold: 0.5,
  };
};

export const getObserver = (
  ref: React.MutableRefObject<IntersectionObserver | null>,
  setisActive: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >,
  initialState: { [key: string]: boolean },
  rootWidth: number
) => {
  let newObserver = new IntersectionObserver(
    handler(setisActive, initialState),
    options(rootWidth)
  );
  ref.current = newObserver;

  return newObserver;
};
