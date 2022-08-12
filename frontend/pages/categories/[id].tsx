import client from "apollo-client";
import Category from "components/category/intex";
import Layout from "components/layout";
import { parse } from "cookie";
import type { GetServerSideProps, NextPage } from "next";
import { CATEGORIES, CATEGORY, PRODUCTS_BY_CATEGORY } from "queries";
import { CategoryType, ProductType } from "types";
import { fetchCartItemsCountResponse, fetchToken } from "utils/helpers";

const CategoryPage: NextPage<{
  categories: CategoryType[];
  category: CategoryType;
  products: ProductType[];
}> = ({ category, products, categories }) => {
  return (
    <Layout
      title={`${category.displayName} Category | Garmin International`}
      categories={categories}
    >
      <Category category={category} products={products} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const cookies = parse(req.headers.cookie || "");

  const { refreshToken, user, expires_in } = await fetchToken(
    cookies.refresh_token
  );

  const cartItemsCountResponse = await fetchCartItemsCountResponse(
    cookies.cartId,
    user
  );

  const categoriesResponse = await client.query({
    query: CATEGORIES,
    variables: { hasSeries: false, hasCoverImgsList: false },
  });

  const categoryResponse = await client.query({
    query: CATEGORY,
    variables: {
      categoryId: params?.id,
      hasProducts: false,
      hasSeries: true,
    },
  });

  const productsResponse = await client.query({
    query: PRODUCTS_BY_CATEGORY,
    variables: { categoryId: params?.id },
  });

  return {
    props: {
      category: categoryResponse.data.category,
      products: productsResponse.data.productsByCategory,
      categories: categoriesResponse.data.categories,
      refreshToken,
      user,
      expires_in,
      initialCount:
        cartItemsCountResponse !== 0
          ? cartItemsCountResponse.data.cartItemsCount.count
          : cartItemsCountResponse,
    },
  };
};

export default CategoryPage;
