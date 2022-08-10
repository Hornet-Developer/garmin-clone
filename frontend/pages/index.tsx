import client from "apollo-client";
import Banner from "components/banner";
import Categories from "components/categories-grid";
import Featureds from "components/featured";
import Layout from "components/layout";
import Pods from "components/pod";
import { parse } from "cookie";
import type { GetServerSideProps, NextPage } from "next";
import { BANNERS, CATEGORIES, FEATUREDS, INITIAL_CART, PODS } from "queries";
import { BannerType, CategoryType, FeaturedType, PodType } from "types";
import { fetchCart, fetchToken } from "utils/helpers";

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
  // let cart = null;

  const { user } = await fetchToken(cookies.refresh_token);

  // if (cookies.cartId && !user) {
  //   cart = await fetchCart(cookies.cartId);
  // }

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
      // cart: user?.cart || cart || null,
      cartId: user?.cart.id || cookies.cartId || null,
    },
  };
};

export default Home;
