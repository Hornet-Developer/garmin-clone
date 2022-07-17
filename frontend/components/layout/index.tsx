import Header from "components/header";
import { useToogleNav } from "contexts/toggle-nav";
import { CategoryType } from "types";
import Head from "./head";

const Layout: React.FC<{
  title: string;
  children: React.ReactNode;
  categories?: CategoryType[];
}> = ({ title, categories, children }) => {
  const { isOpen } = useToogleNav();

  return (
    <div>
      <Head title={title} />
      <Header categories={categories} />
      <main className={`${isOpen ? "hidden" : "block"} lg:block`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
