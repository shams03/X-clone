import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { User } from "./user";

export default async function initServer() {
  const app = express();
  app.use(express.json());
  const graphQlServer = new ApolloServer({
    // schema
    typeDefs: `   
    ${User.types}
    
    type Query{
     ${User.queries}
    }
    `,
    resolvers: { 
      Query: {
        // sayHello: () => `Hello from graphql server`,
        // sayHelloToMe: (parent: any, { name }: { name: string }) =>
        //   `Hello ${name} `,
        ...User.resolvers.queries,
      },
    },
  });
  await graphQlServer.start();
  app.use("/graphql", expressMiddleware(graphQlServer));
  return app;
}
