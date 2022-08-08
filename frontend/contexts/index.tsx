import { mq } from "utils";
import { AuthProvider, TAuthInfo } from "./auth";
import { BreakpointProvider } from "./breakpoint";
import { CartProvider, TCartItemsId } from "./cart";
import { SsrLoadingProvider } from "./loading";
import { ToggleNavProvider } from "./toggle-nav";

const Provider = ({
  children,
  authInfo,
  cartItemsId,
}: {
  children: React.ReactNode;
  authInfo: TAuthInfo;
  cartItemsId: TCartItemsId[] | [];
}) => (
  <ToggleNavProvider>
    <BreakpointProvider queries={mq}>
      <AuthProvider authInfo={authInfo}>
        <SsrLoadingProvider>
          <CartProvider cartItemsId={cartItemsId}>{children}</CartProvider>
        </SsrLoadingProvider>
      </AuthProvider>
    </BreakpointProvider>
  </ToggleNavProvider>
);

export default Provider;
