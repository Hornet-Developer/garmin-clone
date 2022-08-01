import { createContext, useContext, useEffect, useState } from "react";
import { initialMQState } from "utils";

export interface TMatches {
  [key: string]: Boolean;
}

const BreakpointContext = createContext<TMatches>(initialMQState);

export const BreakpointProvider = ({
  children,
  queries,
}: {
  children: React.ReactNode;
  queries: { [key: string]: string };
}) => {
  const [queryMatch, setQueryMatch] = useState(initialMQState);

  useEffect(() => {
    const mediaQueryLists: { [key: string]: any } = {};
    const keys = Object.keys(queries);
    let isAttached = false;

    const handleQueryListener = () => {
      const updatedMatches = keys.reduce(
        (acc: { [key: string]: boolean }, media) => {
          acc[media] = !!(
            mediaQueryLists[media] && mediaQueryLists[media].matches
          );
          return acc;
        },
        {}
      );
      setQueryMatch(updatedMatches);
    };

    const matches: TMatches = {};

    keys.forEach((media) => {
      if (typeof queries[media] === "string") {
        mediaQueryLists[media] = window.matchMedia(queries[media]);
        matches[media] = mediaQueryLists[media].matches;
      } else {
        matches[media] = false;
      }
    });

    setQueryMatch(matches);
    isAttached = true;
    keys.forEach((media) => {
      if (typeof queries[media] === "string") {
        mediaQueryLists[media].addListener(handleQueryListener);
      }
    });

    return () => {
      if (isAttached) {
        keys.forEach((media) => {
          if (typeof queries[media] === "string") {
            mediaQueryLists[media].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, []);

  return (
    <BreakpointContext.Provider value={queryMatch}>
      {children}
    </BreakpointContext.Provider>
  );
};

export function useBreakpoint() {
  const context = useContext(BreakpointContext);
  if (!context)
    throw new Error("useBreakpoint must be used within BreakpointProvider");

  return context;
}
