import client from "apollo-client";
import Layout from "components/layout";
import Login from "components/login";
import Signup from "components/signup";
import { parse } from "cookie";
import { GetServerSideProps, NextPage } from "next";
import { CategoryType } from "types";
import {
  fetchCartItemsCountResponse,
  fetchCategoriesResponse,
} from "utils/helpers";

const SignupPage: NextPage<{
  categories?: CategoryType[];
}> = ({ categories }) => {
  return (
    <Layout
      title="Garmin International | Create Account Page"
      categories={categories}
    >
      <Signup />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parse(req.headers.cookie || "");

  const cartItemsCountResponse = await fetchCartItemsCountResponse(
    cookies.cartId
  );

  const categoriesResponse = await fetchCategoriesResponse();

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

export default SignupPage;
