import path from "path";
import { DateTimeResolver } from "graphql-scalars";
import {
  makeSchema,
  objectType,
  asNexusMethod,
  fieldAuthorizePlugin,
} from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

export const GQLDate = asNexusMethod(DateTimeResolver, "date");

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.image();
    t.model.createdAt();
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.nullable.field("profile", {
      type: "User",
      resolve: (_parent, _args, ctx) => {
        return ctx.request.user || null;
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.nonNull.field("signOut", {
      type: "Boolean",
      authorize: (_root, _args, ctx) => {
        return ctx.request.isAuthenticated();
      },
      resolve: (_parent, _args, ctx) => {
        ctx.request.logout();
        return true;
      },
    });
  },
});

function createFilePath(...paths: string[]): string {
  return path.join(process.cwd(), "src/api/graphql", ...paths);
}

export default makeSchema({
  types: [GQLDate, User, Query, Mutation],
  plugins: [
    nexusPrisma({
      outputs: {
        typegen: createFilePath("./generated/nexus-prisma-typegen.ts"),
      },
    }),
    fieldAuthorizePlugin(),
  ],
  outputs: {
    typegen: createFilePath("./generated/nexus-typegen.ts"),
    schema: createFilePath("./generated/schema.graphql"),
  },
  sourceTypes: {
    modules: [{ module: ".prisma/client", alias: "PrismaClient" }],
  },
  contextType: {
    module: createFilePath("./context.ts"),
    export: "ResolverContext",
  },
});
