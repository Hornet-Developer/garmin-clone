import Layout from "components/layout";
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = parse(req.headers.cookie || "");

  const { cartItemsNumber, cartId } = await fetchCartItemsCountResponse(
    res,
    cookies.cartId,
  );

  const categoriesResponse = await fetchCategoriesResponse();

  return {
    props: {
      categories: categoriesResponse.data.categories,
      initialCount: cartItemsNumber,
      cartId,
    },
  };
};

export default SignupPage;
