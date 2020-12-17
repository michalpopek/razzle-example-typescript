import { NormalizedCacheObject } from "@apollo/client";
import { User as DatabaseUser } from "api/db";

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }

  namespace Express {
    interface User extends DatabaseUser {}
  }
}
