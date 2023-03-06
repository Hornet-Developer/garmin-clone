import client from "apollo-client";
import {
  CATEGORIES,
  INITIAL_CART,
  ITEMS_CART_COUNT,
  USER_SESSION,
} from "queries";
import { CREATE_CART } from "queries/mutations";
import { ServerResponse } from "http";
import cookie from "cookie";

export async function fetchToken(token: string | undefined) {
  const fetchUserSession = token
    ? await client.query({
      query: USER_SESSION,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    })
    : null;

  return {
    refreshToken: fetchUserSession
      ? fetchUserSession.data?.fetchUserSession?.token
      : fetchUserSession,
    user: fetchUserSession
      ? fetchUserSession.data?.fetchUserSession?.user
      : fetchUserSession,
    expires_in: fetchUserSession
      ? fetchUserSession.data?.fetchUserSession?.expiresIn
      : fetchUserSession,
  };
}

export const setContext = (token: string | null) => ({
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const fetchCart = async (cartId: string | null | undefined) => {
  return await client.query({
    query: INITIAL_CART, variables: { cartId },
    fetchPolicy: "network-only"
  });
};

export const createCart = async (cartId?: string | null, token?: string | null) => {
  return await client.mutate(
    token
      ? {
        mutation: CREATE_CART,
        variables: { cartId },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      }
      : { mutation: CREATE_CART }
  );
};

export const fetchCartItemsCountResponse = async (
  res: ServerResponse,
  cartId?: string | null,
) => {
  if (!cartId) {
    const createCartResponse = await createCart()
    const data = createCartResponse.data.fetchOrcreateCart
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("cartId", data.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
        sameSite: "lax",
        path: "/",
      }))
    return { cartItemsNumber: 0, cartId: data.id }
  }
  const cartItemsCountResponse = await client.query({
    query: ITEMS_CART_COUNT,
    variables: { cartId },
    fetchPolicy: "network-only"
  })
  return {
    cartItemsNumber: cartItemsCountResponse.data.cartItemsCount.count,
    cartId
  }
}

export const fetchCategoriesResponse = async () =>
  await client.query({
    query: CATEGORIES,
    variables: { hasSeries: false, hasCoverImgsList: false },
  });
