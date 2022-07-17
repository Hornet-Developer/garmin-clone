import { createContext, useCallback, useContext, useReducer } from "react";

export interface NavStateType {
  isOpen: boolean;
}

export function reducer(
  state: NavStateType,
  action: { type: "TOGGLE" | "DEFAULT" }
): NavStateType {
  const toggleNav = () => ({
    ...state,
    isOpen: !state.isOpen,
  });

  const actions = {
    TOGGLE: toggleNav,
    DEFAULT: () => {
      throw new Error("Action doesn't provided");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
}

export const ToggleNavContext = createContext<
  { state: NavStateType; toggleNav: () => void } | undefined
>(undefined);

export const ToggleNavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { isOpen: false });

  const toggleNav = useCallback(() => dispatch({ type: "TOGGLE" }), []);

  const value = {
    state: { ...state },
    toggleNav,
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
  } = context;

  return { isOpen, toggleNav };
};
