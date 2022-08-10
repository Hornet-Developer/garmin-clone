import { useQuery } from "@apollo/client";
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
import { fetchCart, fetchToken } from "utils/helpers";

const CartPage: NextPage<{
  categories: CategoryType[];
  cartIdcookie: string | null;
}> = ({ categories, cartIdcookie }) => {
  const { token } = useAuthContext();
  const router = useRouter();

  const { data, error, loading } = useQuery(FULL_CART, {
    variables: { cartId: router.query.id },
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
      {loading ? (
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
  let cart = null;

  const { user } = await fetchToken(cookies.refresh_token);

  if (cookies.cartId && !user) {
    cart = await fetchCart(cookies.cartId);
  }

  return {
    props: {
      categories: categoriesResponse.data.categories,
      cartIdcookie:
        Object.keys(cookies).length > 0 ? cookies.cartId || null : null,
      cart: user?.cart || cart || null,
    },
  };
};

export default CartPage;
