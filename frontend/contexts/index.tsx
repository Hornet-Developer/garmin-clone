import { ToggleNavProvider } from "./toggle-nav";

const Provider = ({ children }: { children: React.ReactNode }) => (
  <ToggleNavProvider>{children}</ToggleNavProvider>
);

export default Provider;
