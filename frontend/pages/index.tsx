import client from "apollo-client";
import Banner from "components/banner";
import Categories from "components/categories-grid";
import Featureds from "components/featured";
import Layout from "components/layout";
import Pods from "components/pod";
import { parse } from "cookie";
import type { GetServerSideProps, NextPage } from "next";
import { BANNERS, CATEGORIES, FEATUREDS, PODS } from "queries";
import { BannerType, CategoryType, FeaturedType, PodType } from "types";
import { fetchCartItemsCountResponse, fetchToken } from "utils/helpers";

const Home: NextPage<{
  categories?: CategoryType[];
  banners?: BannerType[];
  featureds?: FeaturedType[];
  pods?: PodType[];
}> = ({ categories, banners, featureds, pods }) => {
  return (
    <Layout title="Garmin International | Home" categories={categories}>
      <Banner banners={banners} />
      <Featureds featureds={featureds} />
      <Pods pods={pods} />
      <Categories categories={categories} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parse(req.headers.cookie || "");

  const { user, refreshToken, expires_in } = await fetchToken(
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

  const bannersResponse = await client.query({
    query: BANNERS,
  });

  const featuredsResponse = await client.query({
    query: FEATUREDS,
  });

  const podsResponse = await client.query({
    query: PODS,
  });

  return {
    props: {
      categories: categoriesResponse.data.categories,
      banners: bannersResponse.data.banners,
      featureds: featuredsResponse.data.featureds,
      pods: podsResponse.data.pods,
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

export default Home;
