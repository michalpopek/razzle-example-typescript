import { Router } from "express";
import graphqlPlayground from "graphql-playground-middleware-express";
import { createApolloServer } from "api/graphql/apollo";

export default function graphql() {
  const router = Router();
  const server = createApolloServer();

  if (process.env.NODE_ENV === "development") {
    router.get("/", (req, res, next) => {
      const headers = encodeURIComponent(
        JSON.stringify({ "x-csrf-token": req.csrfToken() })
      );
      const renderPlayground = graphqlPlayground({
        endpoint: `/api/graphql?headers=${headers}`,
        settings: {
          "editor.reuseHeaders": true,
          "request.credentials": "same-origin",
        },
      } as any);
      renderPlayground(req, res, next);
    });
  }

  router.use(server.getMiddleware({ path: "/" }));

  return router;
}
