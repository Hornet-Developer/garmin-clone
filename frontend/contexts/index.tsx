import { CategoriesProvider } from "./categories";

const Provider = ({ children }: { children: React.ReactNode }) => (
  <CategoriesProvider>{children}</CategoriesProvider>
);

export default Provider;
