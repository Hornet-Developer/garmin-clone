import { ApolloClient, InMemoryCache } from "@apollo/client";

// const LOCAL_HOST = "http://localhost:4001/graphql";
const LOCAL_HOST = "https://garmin-clone-backend.herokuapp.com/graphql";

const client = new ApolloClient({
  uri: process.env.HOST || LOCAL_HOST,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
