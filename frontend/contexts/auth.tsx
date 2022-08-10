import { useMutation } from "@apollo/client";
import { compareObjectIdCallback, useDeepMemo } from "hooks/useDeepMemo";
import { REFRESH_TOKEN } from "queries/mutations";
import { useContext } from "react";
import { createContext, useEffect, useRef, useState } from "react";
import { UserType } from "types";
import { setContext } from "utils/helpers";

interface TContext {
  loggedUser: UserType | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
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
}: {
  children: React.ReactNode;
  authInfo: TAuthInfo;
}) => {
  const [loggedUser, setLoggedUser] = useState<UserType | null>(
    authInfo.user || null
  );
  const [token, setToken] = useState<string | null>(authInfo.token || null);

  const [refresh] = useMutation(REFRESH_TOKEN);

  const timerId = useRef<NodeJS.Timeout | number | null>(null);

  const refreshToken = () => {
    refresh({
      onCompleted: (data) => {
        if (token || data.refreshToken.refresh_token) {
          data.refreshToken.user &&
            !loggedUser &&
            setLoggedUser(data.refreshToken.user);
          data.refreshToken.refresh_token &&
            !token &&
            setLoggedUser(data.refreshToken.refresh_token);

          timerId.current && clearTimeout(timerId.current);
          timerId.current = setTimeout(() => {
            refreshToken();
          }, (data.refreshToken.expires_in || authInfo.expires_in) - Date.now() - 5000);
        }
      },
      onError: () => {
        timerId.current && clearTimeout(timerId.current);
      },
      context: setContext(token),
    });
  };

  const memoizedUser = useDeepMemo(loggedUser, compareObjectIdCallback);

  useEffect(() => {
    if (!memoizedUser && timerId.current) clearTimeout(timerId.current);
    let doUpdate = true;
    if (doUpdate && memoizedUser) refreshToken();
    return () => {
      doUpdate = false;
      timerId.current && clearTimeout(timerId.current);
    };
  }, [memoizedUser]);

  const value = {
    loggedUser,
    setLoggedUser,
    token,
    setToken,
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
