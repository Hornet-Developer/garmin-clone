import client from "apollo-client";
import Banner from "components/banner";
import Featureds from "components/featured";
import Layout from "components/layout";
import type { NextPage } from "next";
import { BANNERS, CATEGORIES, FEATUREDS, PODS } from "queries";
import { BannerType, CategoryType, FeaturedType, PodType } from "types";

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
    </Layout>
  );
};

export async function getStaticProps() {
  const categoriesResponse = await client.query({
    query: CATEGORIES,
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
    },
  };
}

export default Home;
