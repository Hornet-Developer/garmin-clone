import { mq } from "utils";
import { BreakpointProvider } from "./breakpoint";
import { SsrLoadingProvider } from "./loading";
import { ToggleNavProvider } from "./toggle-nav";

const Provider = ({ children }: { children: React.ReactNode }) => (
  <ToggleNavProvider>
    <BreakpointProvider queries={mq}>
      <SsrLoadingProvider>{children}</SsrLoadingProvider>
    </BreakpointProvider>
  </ToggleNavProvider>
);

export default Provider;
