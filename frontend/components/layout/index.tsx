import Header from "components/header";
import { FullScreenNewPage, Loader } from "components/loading/styles";
import { useToggleNav } from "contexts/toggle-nav";
import { useSsrLoading } from "hooks/useSsrLoading";
import { CategoryType } from "types";
import Head from "./head";

const Layout: React.FC<{
  title: string;
  children: React.ReactNode;
  categories?: CategoryType[];
}> = ({ title, categories, children }) => {
  const { isOpen } = useToggleNav();
  const { loading } = useSsrLoading();

  return (
    <div className="">
      <Head title={title} />
      <Header categories={categories} />
      {loading ? (
        <FullScreenNewPage>
          <Loader />
        </FullScreenNewPage>
      ) : (
        <main className={`${isOpen ? "hidden" : "block"} lg:block pb-10`}>
          {children}
        </main>
      )}
    </div>
  );
};

export default Layout;
