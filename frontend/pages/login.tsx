import client from "apollo-client";
import Layout from "components/layout";
import Login from "components/login";
import { GetServerSideProps, NextPage } from "next";
import { CATEGORIES } from "queries";
import { CategoryType } from "types";
import { fetchInitialCart, fetchToken } from "utils/helpers";

const LoginPage: NextPage<{
  categories?: CategoryType[];
}> = ({ categories }) => {
  return (
    <Layout title="Garmin International | Login Page" categories={categories}>
      <Login />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { refreshToken, user, expires_in } = await fetchToken(
    req.headers.cookie
  );

  const categoriesResponse = await client.query({
    query: CATEGORIES,
    variables: { hasSeries: false, hasCoverImgsList: false },
  });

  const cartResponse = await fetchInitialCart(refreshToken);

  return {
    props: {
      categories: categoriesResponse.data.categories,
      refreshToken,
      user,
      expires_in,
      cart: cartResponse.data.cart,
    },
  };
};

export default LoginPage;
