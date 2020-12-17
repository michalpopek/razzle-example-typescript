import { Router } from "express";
import auth from "./auth";
import graphql from "./graphql";
import ssr from "./ssr";

export function createRouter() {
  const router = Router();

  const api = Router();
  api.use("/auth", auth());
  api.use("/graphql", graphql());

  router.use("/api", api);
  router.get("/*", ssr);

  return router;
}
