import client from "apollo-client";
import { INITIAL_CART, ITEMS_CART_COUNT, USER_SESSION } from "queries";
import { CREATE_CART } from "queries/mutations";
import { UserType } from "types";

export async function fetchToken(token: string | undefined) {
  const fetchUserSession = token
    ? await client.query({
        query: USER_SESSION,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
    : null;

  return {
    refreshToken: fetchUserSession
      ? fetchUserSession.data?.fetchUserSession?.refresh_token
      : fetchUserSession,
    user: fetchUserSession
      ? fetchUserSession.data?.fetchUserSession?.user
      : fetchUserSession,
    expires_in: fetchUserSession
      ? fetchUserSession.data?.fetchUserSession?.expires_in
      : fetchUserSession,
  };
}

export const setContext = (token: string | null) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchCart = async (cartId: string | null | undefined) => {
  return await client.query({ query: INITIAL_CART, variables: { cartId } });
};

export const createCart = async (token: string | null | undefined) => {
  return await client.mutate(
    token
      ? {
          mutation: CREATE_CART,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }
      : { mutation: CREATE_CART }
  );
};

export const fetchCartItemsCountResponse = async (
  cartIdcookie?: string,
  user?: UserType
) =>
  cartIdcookie || user
    ? await client.query({
        query: ITEMS_CART_COUNT,
        variables: { cartId: user?.cartId || cartIdcookie },
      })
    : 0;
