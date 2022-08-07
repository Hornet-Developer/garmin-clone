import { mq } from "utils";
import { AuthProvider, TAuthInfo } from "./auth";
import { BreakpointProvider } from "./breakpoint";
import { SsrLoadingProvider } from "./loading";
import { ToggleNavProvider } from "./toggle-nav";

const Provider = ({
  children,
  authInfo,
}: {
  children: React.ReactNode;
  authInfo: TAuthInfo;
}) => (
  <ToggleNavProvider>
    <BreakpointProvider queries={mq}>
      <AuthProvider authInfo={authInfo}>
        <SsrLoadingProvider>{children}</SsrLoadingProvider>
      </AuthProvider>
    </BreakpointProvider>
  </ToggleNavProvider>
);

export default Provider;
