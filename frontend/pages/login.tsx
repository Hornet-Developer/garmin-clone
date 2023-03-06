import Layout from "components/layout";
import Login from "components/login";
import { parse } from "cookie";
import { GetServerSideProps, NextPage } from "next";
import { CategoryType } from "types";
import {
  fetchCartItemsCountResponse,
  fetchCategoriesResponse,
} from "utils/helpers";

const LoginPage: NextPage<{
  categories?: CategoryType[];
}> = ({ categories }) => {
  return (
    <Layout title="Garmin International | Login Page" categories={categories}>
      <Login />
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

export default LoginPage;
