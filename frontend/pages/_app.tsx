import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "utils/theme";
import { ApolloProvider } from "@apollo/client";
import client from "apollo-client";
import Provider from "contexts";
import { useMemo } from "react";

if (typeof window === "object" && process.env.NODE_ENV === "development") {
  const { worker } = require("__mocks__/browser");
  worker.start();
}

function MyApp({ Component, pageProps }: AppProps) {
  const cartItemsId =
    pageProps.cart?.cartItems.length > 0
      ? pageProps.cart.cartItems.map(
          (item: { id: string; [key: string]: any }) => ({ id: item.id })
        )
      : [];

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Provider
          authInfo={{
            user: pageProps.user,
            token: pageProps.refreshToken,
            expires_in: pageProps.expires_in,
          }}
          cartItemsId={cartItemsId || []}
        >
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
