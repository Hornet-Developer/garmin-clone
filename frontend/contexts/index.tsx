import { SsrLoadingProvider } from "./loading";
import { ToggleNavProvider } from "./toggle-nav";

const Provider = ({ children }: { children: React.ReactNode }) => (
  <ToggleNavProvider>
    <SsrLoadingProvider>{children}</SsrLoadingProvider>
  </ToggleNavProvider>
);

export default Provider;
