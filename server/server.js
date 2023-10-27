import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import { resolvers, typeDefs } from "./schema/Schema.js";
import bodyParser from "body-parser";

const runApolloServer = async (typeDefs, resolvers) => {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/people-cars",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:8000/people-cars`);
};

runApolloServer(typeDefs, resolvers);
