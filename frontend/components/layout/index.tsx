import Header from "components/header";
import FullScreenLoading from "components/loading/full-screen";
import { useToogleNav } from "contexts/toggle-nav";
import { useSsrLoading } from "hooks/useSsrLoading";
import { CategoryType } from "types";
import Head from "./head";

const Layout: React.FC<{
  title: string;
  children: React.ReactNode;
  categories?: CategoryType[];
}> = ({ title, categories, children }) => {
  const { isOpen } = useToogleNav();
  const { loading } = useSsrLoading();

  return (
    <div className="">
      <Head title={title} />
      <Header categories={categories} />
      {loading ? (
        <FullScreenLoading />
      ) : (
        <main className={`${isOpen ? "hidden" : "block"} lg:block`}>
          {children}
        </main>
      )}
    </div>
  );
};

export default Layout;
