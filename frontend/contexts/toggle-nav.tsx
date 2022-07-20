import { createContext, useCallback, useContext, useReducer } from "react";
import { DispatchAction } from "types";

export interface NavStateType {
  isOpen: boolean;
}

export function reducer(
  state: NavStateType,
  action: { type: "TOGGLE" | "CLOSE" | "DEFAULT" }
): NavStateType {
  const toggleNav = () => ({
    ...state,
    isOpen: !state.isOpen,
  });

  const closeNav = () => ({
    ...state,
    isOpen: false,
  });

  const actions = {
    TOGGLE: toggleNav,
    CLOSE: closeNav,
    DEFAULT: () => {
      throw new Error("Action doesn't provided");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
}

export const ToggleNavContext = createContext<
  | { state: NavStateType; toggleNav: DispatchAction; closeNav: DispatchAction }
  | undefined
>(undefined);

export const ToggleNavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { isOpen: false });

  const toggleNav = useCallback(() => dispatch({ type: "TOGGLE" }), []);

  const closeNav = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const value = {
    state: { ...state },
    toggleNav,
    closeNav,
  };

  return (
    <ToggleNavContext.Provider value={value}>
      {children}
    </ToggleNavContext.Provider>
  );
};

export const useToogleNav = () => {
  const context = useContext(ToggleNavContext);

  if (!context) {
    throw new Error("useToogleNav must be used within a ToggleNavProvider");
  }

  const {
    state: { isOpen },
    toggleNav,
    closeNav,
  } = context;

  return { isOpen, toggleNav, closeNav };
};
