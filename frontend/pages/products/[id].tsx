import client from "apollo-client";
import Layout from "components/layout";
import Product from "components/product";
import { ProductInfoProvider } from "components/product/product-info-context";
import { parse } from "cookie";
import type { GetServerSideProps, NextPage } from "next";
import {
  CATEGORIES,
  CATEGORY_PRODUCT_PAGE,
  PRODUCT,
  SERIE_PRODUCT_PAGE,
} from "queries";
import { useMemo } from "react";
import { CategoryType, ProductType, SerieType } from "types";
import { fetchCartItemsCountResponse, fetchToken } from "utils/helpers";

const ProductPage: NextPage<{
  categories: CategoryType[];
  product: ProductType;
  serie: SerieType;
  category: CategoryType;
}> = ({ categories, product, serie, category }) => {
  const features = useMemo(
    () =>
      product.features?.map((feature) => ({
        id: feature.id,
        name: feature.name,
        item: feature.items?.[0] as string,
      })),
    []
  );

  return (
    <Layout
      title={`${product.name} | Garmin International`}
      categories={categories}
    >
      <ProductInfoProvider
        initialState={{ model: product.models?.[0], features }}
      >
        <Product category={category} product={product} serie={serie} />
      </ProductInfoProvider>
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
      initialCount:
        cartItemsCountResponse !== 0
          ? cartItemsCountResponse.data.cartItemsCount.count
          : cartItemsCountResponse,
    },
  };
};

export default ProductPage;
