import client from "apollo-client";
import Layout from "components/layout";
import Login from "components/login";
import { parse } from "cookie";
import { GetServerSideProps, NextPage } from "next";
import { CATEGORIES } from "queries";
import { CategoryType } from "types";
import { fetchCartItemsCountResponse } from "utils/helpers";

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

  const cartItemsCountResponse = await fetchCartItemsCountResponse(
    cookies.cartId
  );

  const categoriesResponse = await client.query({
    query: CATEGORIES,
    variables: { hasSeries: false, hasCoverImgsList: false },
  });

  return {
    props: {
      categories: categoriesResponse.data.categories,
      initialCount:
        cartItemsCountResponse !== 0
          ? cartItemsCountResponse.data.cartItemsCount.count
          : cartItemsCountResponse,
    },
  };
};

export default LoginPage;
