import { CookiesProvider } from "react-cookie";
import { mq } from "utils";
import { AuthProvider, TAuthInfo } from "./auth";
import { BreakpointProvider } from "./breakpoint";
import { CartItemsCountProvider } from "./cartItemsCount";
import { SsrLoadingProvider } from "./loading";
import { ToggleNavProvider } from "./toggle-nav";

const Provider = ({
  children,
  authInfo,
  initialCount,
}: {
  children: React.ReactNode;
  authInfo: TAuthInfo;
  initialCount: number;
}) => (
  <ToggleNavProvider>
    <BreakpointProvider queries={mq}>
      <AuthProvider authInfo={authInfo}>
        <SsrLoadingProvider>
          <CookiesProvider>
            <CartItemsCountProvider initialCount={initialCount}>
              {children}
            </CartItemsCountProvider>
          </CookiesProvider>
        </SsrLoadingProvider>
      </AuthProvider>
    </BreakpointProvider>
  </ToggleNavProvider>
);

export default Provider;
