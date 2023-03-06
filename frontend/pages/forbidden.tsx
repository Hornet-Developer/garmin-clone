import { Container } from "components/header/styles";
import Layout from "components/layout";
import { NextPage } from "next";
import { CategoryType } from "types";
const LoginPage: NextPage<{
  categories?: CategoryType[];
}> = ({ categories }) => {
  return (
    <Layout title="Garmin International | Forbidden access" categories={categories}>
      <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <h1 className="tracking-wide font-semibold text-4xl">403 | Forbidden Request</h1>
      </div>
    </Layout>
  );
};

export default LoginPage;
