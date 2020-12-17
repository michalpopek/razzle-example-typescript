import createRedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import express, { CookieOptions } from "express";
import session from "express-session";
import passport from "api/passport";
import { createRouter } from "api/router";
import { redis } from "./redis";

const RedisStore = createRedisStore(session);

const sessionSecret = process.env.RAZZLE_SESSION_SECRET!;

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

export function createApiServer() {
  return express()
    .disable("x-powered-by")
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .use(cookieParser(sessionSecret))
    .use(csrf({ cookie: cookieOptions }))
    .use(
      session({
        name: "sid",
        secret: sessionSecret,
        cookie: cookieOptions,
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({ client: redis }),
      })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use(createRouter());
}
