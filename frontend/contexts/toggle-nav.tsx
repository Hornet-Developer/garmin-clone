import { useToggle } from "hooks/useToggle";
import { createContext, useContext } from "react";
import { DispatchAction } from "types";

export interface NavStateType {
  isOpen: boolean;
}

export const ToggleNavContext = createContext<
  | { state: NavStateType; toggleNav: DispatchAction; closeNav: DispatchAction }
  | undefined
>(undefined);

export const ToggleNavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, toggleHandler, closeHandler } = useToggle();

  const value = {
    state: { isOpen },
    toggleNav: toggleHandler,
    closeNav: closeHandler,
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
