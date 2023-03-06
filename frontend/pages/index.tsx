import client from "apollo-client";
import Layout from "components/layout";
import { parse } from "cookie";
import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { BANNERS, FEATUREDS, PODS } from "queries";
import { BannerType, CategoryType, FeaturedType, PodType } from "types";
import {
  fetchCartItemsCountResponse,
  fetchCategoriesResponse,
  fetchToken,
} from "utils/helpers";

const Banner = dynamic(() => import("../components/banner"));
const Featureds = dynamic(() => import("../components/featured"));
const Pods = dynamic(() => import("../components/pod"), { ssr: false });
const Categories = dynamic(() => import("../components/categories-grid"), {
  ssr: false,
});

const Home: NextPage<{
  categories: CategoryType[];
  banners: BannerType[];
  featureds: FeaturedType[];
  pods: PodType[];
}> = ({ categories, banners, featureds, pods }) => {
  return (
    <Layout title="Garmin International | Home" categories={categories}>
      <Banner banners={banners} href={`/categories/${categories[0].id}`} />
      <Featureds
        featureds={featureds}
        href={`/categories/${categories[1].id}`}
      />
      <Pods pods={pods} href={`/categories/${categories[2].id}`} />
      <Categories categories={categories} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = parse(req.headers.cookie || "");

  const { user, refreshToken, expires_in } = await fetchToken(
    cookies.refresh_token,
  );

  const { cartItemsNumber, cartId } = await fetchCartItemsCountResponse(
    res,
    cookies.cartId ?? user?.cartId,
  );

  const categoriesResponse = await fetchCategoriesResponse();

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
      initialCount: cartItemsNumber,
      cartId,
    },
  };
};

export default Home;
