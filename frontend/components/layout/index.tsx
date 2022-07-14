import Header from "components/header";
import { CategoryType } from "types/product";
import Head from "./head";

const Layout: React.FC<{
  title: string;
  children: React.ReactNode;
  categories?: CategoryType[];
}> = ({ title, categories, children }) => {
  return (
    <div>
      <Head title={title} />
      <Header categories={categories} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
