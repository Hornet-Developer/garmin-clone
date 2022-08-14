import { ApolloClient, InMemoryCache } from "@apollo/client";

const LOCAL_HOST = "http://192.168.100.10:4001/graphql";

const client = new ApolloClient({
  uri: process.env.HOST || LOCAL_HOST,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
