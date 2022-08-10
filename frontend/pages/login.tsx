import client from "apollo-client";
import Layout from "components/layout";
import Login from "components/login";
import { parse } from "cookie";
import { GetServerSideProps, NextPage } from "next";
import { CATEGORIES } from "queries";
import { CategoryType } from "types";
import { fetchCart, fetchToken } from "utils/helpers";

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
  const cookies = parse(req.headers.cookie || "");
  let cart = null;

  const { user } = await fetchToken(cookies.refresh_token);

  if (cookies.cartId && !user) {
    cart = await fetchCart(cookies.cartId);
  }

  const categoriesResponse = await client.query({
    query: CATEGORIES,
    variables: { hasSeries: false, hasCoverImgsList: false },
  });

  return {
    props: {
      categories: categoriesResponse.data.categories,
      cart: user?.cart || cart || null,
    },
  };
};

export default LoginPage;
