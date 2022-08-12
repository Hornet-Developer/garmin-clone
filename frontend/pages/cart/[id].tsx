import { ApolloQueryResult, NetworkStatus, useQuery } from "@apollo/client";
import client from "apollo-client";
import Cart from "components/cart";
import CartEmpty from "components/cart/cart-empty";
import Layout from "components/layout";
import ContainerLoading from "components/loading/container";
import PrivateRoute from "components/private-route";
import { useAuthContext } from "contexts/auth";
import { parse } from "cookie";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { CATEGORIES, FULL_CART } from "queries";
import { Fragment } from "react";
import { CategoryType } from "types";
import { fetchCartItemsCountResponse, fetchToken } from "utils/helpers";

export type TRefreshQuery = (
  variables?:
    | Partial<{
        cartId: string | string[] | undefined;
      }>
    | undefined
) => Promise<ApolloQueryResult<any>>;

const CartPage: NextPage<{
  categories: CategoryType[];
  cartIdcookie: string | null;
}> = ({ categories, cartIdcookie }) => {
  const { token } = useAuthContext();
  const router = useRouter();

  const { data, error, loading, refetch, networkStatus } = useQuery(FULL_CART, {
    fetchPolicy: "network-only",
    variables: { cartId: router.query.id },
    notifyOnNetworkStatusChange: true,
    context: {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    },
  });

  return (
    <Layout title={`Garmin International | Cart`} categories={categories}>
      {loading || networkStatus === NetworkStatus.refetch ? (
        <ContainerLoading />
      ) : (
        <PrivateRoute
          errorMessage={error?.message}
          token={token}
          cartIdCookie={cartIdcookie}
        >
          <h1 className="uppercase text-center py-6 w-full">cart</h1>
          {data?.cart?.cartItems?.length > 0 ? (
            <Cart
              cartItems={data?.cart?.cartItems}
              formattedSubtotal={data?.cart?.formattedSubtotal}
              formattedEstimatedTotal={data?.cart?.formattedEstimatedTotal}
              refetch={refetch}
            />
          ) : (
            <Fragment>
              {data?.cart?.cartItems?.length === 0 && <CartEmpty />}
            </Fragment>
          )}
        </PrivateRoute>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const categoriesResponse = await client.query({
    query: CATEGORIES,
    variables: { hasSeries: false, hasCoverImgsList: false },
  });

  const cookies = parse(req.headers.cookie || "");

  const { user, refreshToken, expires_in } = await fetchToken(
    cookies.refresh_token
  );

  const cartItemsCountResponse = await fetchCartItemsCountResponse(
    cookies.cartId,
    user
  );

  return {
    props: {
      categories: categoriesResponse.data.categories,
      cartIdcookie:
        Object.keys(cookies).length > 0 ? cookies.cartId || null : null,
      user,
      refreshToken,
      expires_in,
      initialCount:
        cartItemsCountResponse !== 0
          ? cartItemsCountResponse.data.cartItemsCount.count
          : cartItemsCountResponse,
    },
  };
};

export default CartPage;
