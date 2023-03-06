import { ApolloQueryResult, NetworkStatus, useQuery } from "@apollo/client";
import Cart from "components/cart";
import CartEmpty from "components/cart/cart-empty";
import Layout from "components/layout";
import ContainerLoading from "components/loading/container";
import PrivateRoute from "components/private-route";
import { parse } from "cookie";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FULL_CART } from "queries";
import { Fragment } from "react";
import { CategoryType } from "types";
import {
  fetchCartItemsCountResponse,
  fetchCategoriesResponse,
  fetchToken,
} from "utils/helpers";

export type TRefreshQuery = (
  variables?:
    | Partial<{
        cartId: string | undefined;
      }>
    | undefined,
) => Promise<ApolloQueryResult<any>>;

const CartPage: NextPage<{
  categories: CategoryType[];
  cartId: string
  token: string | null;
}> = ({ categories, token, cartId }) => {
  const router = useRouter();

  const { data, error, loading, refetch, networkStatus } = useQuery(FULL_CART, {
    fetchPolicy: "network-only",
    variables: { cartId },
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
          cartIdCookie={cartId}
          condition={router.query.id === cartId}
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res
}) => {
  const categoriesResponse = await fetchCategoriesResponse();

  const cookies = parse(req.headers.cookie || "");

  const { user, refreshToken, expires_in } = await fetchToken(
    cookies.refresh_token,
  );

  const { cartItemsNumber, cartId } = await fetchCartItemsCountResponse(
    res,
    cookies.cartId ?? user?.cartId,
  );

  return {
    props: {
      categories: categoriesResponse.data.categories,
      user,
      refreshToken,
      expires_in,
      initialCount: cartItemsNumber,
      cartId,
    },
  };
};

export default CartPage;
