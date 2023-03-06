import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";

import createSeed from "./seeds";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { getUserAuth } from "./utils";

const prisma = new PrismaClient();
export const pubsub = new PubSub();

async function main() {
  await createSeed(prisma);
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    context: async ({ req }) => {
      const userAuth = await getUserAuth(req);

      return {
        ...req,
        prisma,
        pubsub,
        userId: userAuth ? userAuth.userId : null,
        token: userAuth ? userAuth.token : null,
        expiresIn: userAuth ? userAuth.expiresIn : null,
        userRole: userAuth ? userAuth.userRole : null,
        cartId: userAuth ? userAuth.cartId : null,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      credentials: true,
      origin: ["http://localhost:3000"],
    },
  });

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4001 }, resolve),
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 4001}${
      server.graphqlPath
    }`,
  );
}

main();
