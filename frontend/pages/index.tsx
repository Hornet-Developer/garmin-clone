import client from "apollo-client";
import Layout from "components/layout";
import type { NextPage } from "next";
import { CATEGORIES } from "queries/product";
import { CategoryType } from "types/product";

const Home: NextPage<{ categories?: CategoryType[] }> = ({ categories }) => {
  return (
    <div>
      <Layout title="Garmin International | Home" categories={categories}>
        <></>
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  const categoriesResponse = await client.query({
    query: CATEGORIES,
  });

  return {
    props: {
      categories: categoriesResponse.data.categories,
    },
  };
}

export default Home;
