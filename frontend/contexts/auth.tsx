import { useContext } from "react";
import { createContext, useState } from "react";
import { UserType } from "types";

interface TContext {
  loggedUser: UserType | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  cartId: string | null;
  setCartId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface TAuthInfo {
  user: UserType | null;
  token: string | null;
  expires_in: number | null;
}

const AuthContext = createContext<TContext | undefined>(undefined);

export const AuthProvider = ({
  children,
  authInfo,
  guestCartId,
}: {
  children: React.ReactNode;
  authInfo: TAuthInfo;
  guestCartId: string | null;
}) => {
  const [loggedUser, setLoggedUser] = useState<UserType | null>(
    authInfo.user || null,
  );
  const [token, setToken] = useState<string | null>(authInfo.token || null);
  const [cartId, setCartId] = useState<string | null>(guestCartId || null);

  const value = {
    loggedUser,
    setLoggedUser,
    token,
    setToken,
    cartId,
    setCartId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
