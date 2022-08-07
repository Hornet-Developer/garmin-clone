import client from "apollo-client";
import Layout from "components/layout";
import Product from "components/product";
import type { GetServerSideProps, NextPage } from "next";
import {
  CATEGORIES,
  CATEGORY_PRODUCT_PAGE,
  PRODUCT,
  SERIE_PRODUCT_PAGE,
} from "queries";
import { CategoryType, ProductType, SerieType } from "types";
import { fetchToken } from "utils/helpers";

const ProductPage: NextPage<{
  categories: CategoryType[];
  product: ProductType;
  serie: SerieType;
  category: CategoryType;
}> = ({ categories, product, serie, category }) => {
  return (
    <Layout
      title={`${product.name} | Garmin International`}
      categories={categories}
    >
      <Product category={category} product={product} serie={serie} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { refreshToken, user, expires_in } = await fetchToken(
    req.headers.cookie
  );
  const categoriesResponse = await client.query({
    query: CATEGORIES,
    variables: { hasSeries: false, hasCoverImgsList: false },
  });

  const productResponse = await client.query({
    query: PRODUCT,
    variables: { productId: params?.id },
  });

  const serieResponse = await client.query({
    query: SERIE_PRODUCT_PAGE,
    variables: {
      serieId: productResponse?.data?.product?.serieId,
      hasProducts: false,
    },
  });

  const categoryResponse = await client.query({
    query: CATEGORY_PRODUCT_PAGE,
    variables: {
      categoryId: serieResponse?.data?.serie.categoryId,
      hasProducts: false,
      hasSeries: false,
    },
  });

  return {
    props: {
      categories: categoriesResponse.data.categories,
      product: productResponse.data.product,
      serie: serieResponse.data.serie,
      category: categoryResponse.data.category,
      refreshToken,
      user,
      expires_in,
    },
  };
};

export default ProductPage;
