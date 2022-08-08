import client from "apollo-client";
import { parse } from "cookie";
import { INITIAL_CART } from "queries";
import { REFRESH_TOKEN } from "queries/mutations";

export async function fetchToken(cookie: string | undefined) {
  const token = parse(cookie || "");

  const refreshTokenResponse = token.refresh_token
    ? await client.mutate({
        mutation: REFRESH_TOKEN,
        context: {
          headers: {
            Authorization: `Bearer ${token.refresh_token}`,
          },
        },
      })
    : null;

  return {
    refreshToken: refreshTokenResponse
      ? refreshTokenResponse.data?.refreshToken.refresh_token
      : refreshTokenResponse,
    user: refreshTokenResponse
      ? refreshTokenResponse.data?.refreshToken.user
      : refreshTokenResponse,
    expires_in: refreshTokenResponse
      ? refreshTokenResponse.data?.refreshToken.expires_in
      : refreshTokenResponse,
  };
}

export const setContext = (token: string | null) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchInitialCart = async (token: string | null | undefined) => {
  return await client.query(
    token
      ? {
          query: INITIAL_CART,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      : { query: INITIAL_CART }
  );
};
