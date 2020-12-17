import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { ApolloServer } from "apollo-server-express";
import { createResolverContext, ResolverContext } from "./context";
import schema from "./schema";

export function createApolloServer() {
  return new ApolloServer({
    schema,
    context: ({ req }) => createResolverContext(req),
    playground: false,
  });
}

export function createApolloClient(context: ResolverContext) {
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema, context }),
  });
}
