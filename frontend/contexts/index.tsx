import { CookiesProvider } from "react-cookie";
import { mq } from "utils";
import { AuthProvider, TAuthInfo } from "./auth";
import { BreakpointProvider } from "./breakpoint";
import { CartProvider, TCartItemsId } from "./cart";
import { SsrLoadingProvider } from "./loading";
import { ToggleNavProvider } from "./toggle-nav";

const Provider = ({
  children,
  authInfo,
  cartId,
}: {
  children: React.ReactNode;
  authInfo: TAuthInfo;
  cartId: string | null;
}) => (
  <ToggleNavProvider>
    <BreakpointProvider queries={mq}>
      <AuthProvider authInfo={authInfo}>
        <SsrLoadingProvider>
          <CookiesProvider>
            <CartProvider cartId={cartId}>{children}</CartProvider>
          </CookiesProvider>
        </SsrLoadingProvider>
      </AuthProvider>
    </BreakpointProvider>
  </ToggleNavProvider>
);

export default Provider;
