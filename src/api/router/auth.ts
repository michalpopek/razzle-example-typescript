import { Router } from "express";
import passport from "api/passport";

export default function auth() {
  return Router()
    .get(
      "/github",
      (req, _, next) => {
        req.session.authReferer = req.params.ref || req.headers.referer || null;
        next();
      },
      passport.authenticate("github")
    )
    .get(
      "/github/callback",
      passport.authenticate("github", { failureRedirect: "/login" }),
      (req, res) => {
        res.redirect(req.session.authReferer || "/");
      }
    );
}
