import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "utils/theme";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "apollo-client";
import Provider from "contexts";
import { INITIAL_CART } from "queries";

if (typeof window === "object" && process.env.NODE_ENV === "development") {
  const { worker } = require("__mocks__/browser");
  worker.start();
}

function MyApp({ Component, pageProps }: AppProps) {
  // const { data } = useQuery(INITIAL_CART, {
  //   variables: { cartId: pageProps.cartId },
  console.log(pageProps.cartId);
  // });

  // const cartItemsId =
  //   data.initialCart?.cartItems?.length > 0
  //     ? pageProps.cart.cartItems.map(
  //         (item: { id: string; [key: string]: any }) => ({ id: item.id })
  //       )
  //     : [];
  // pageProps.cart?.cartItems?.length > 0
  //   ? pageProps.cart.cartItems.map(
  //       (item: { id: string; [key: string]: any }) => ({ id: item.id })
  //     )
  //   : [];

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Provider
          authInfo={{
            user: pageProps.user,
            token: pageProps.refreshToken,
            expires_in: pageProps.expires_in,
          }}
          cartId={pageProps.cartId || null}
        >
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
