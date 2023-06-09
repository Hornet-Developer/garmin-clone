import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "utils/theme";
import { ApolloProvider } from "@apollo/client";
import client from "apollo-client";
import Provider from "contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        {pageProps.statusCode !== 404 ? (
          <Provider
            authInfo={{
              user: pageProps.user,
              token: pageProps.refreshToken,
              expires_in: pageProps.expires_in,
            }}
            guestCartId={pageProps.cartId}
            initialCount={pageProps.initialCount}
          >
            <Component {...pageProps} />
          </Provider>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
