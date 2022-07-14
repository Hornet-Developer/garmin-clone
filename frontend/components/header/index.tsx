import { CategoryType } from "types/product";
import { ToggleNavProvider } from "./context";
import Header from "./Header";

const HeaderContainer = ({ categories }: { categories?: CategoryType[] }) => (
  <ToggleNavProvider>
    <Header categories={categories} />
  </ToggleNavProvider>
);

export default HeaderContainer;
