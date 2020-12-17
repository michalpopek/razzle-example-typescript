import { ApolloClient } from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { NextFunction, Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { createApolloClient as createApolloClient } from "api/graphql/apollo";
import { createResolverContext } from "api/graphql/context";
import { ServerApp } from "app/server";

let assets: any;
(function syncLoadAssets() {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
})();

function renderMarkupWithStyles(app: JSX.Element): [string, string] {
  const sheet = new ServerStyleSheet();
  try {
    const markup = renderToString(sheet.collectStyles(app));
    const styles = sheet.getStyleTags();
    return [markup, styles];
  } finally {
    sheet.seal();
  }
}

function extractApolloState(client: ApolloClient<any>): string {
  const state = client.extract();
  return JSON.stringify(state).replace(/</g, "\\u003c");
}

export default async function render(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apollo = createApolloClient(createResolverContext(req));
  const context: { statusCode?: number } = {};
  const app = (
    <ServerApp apolloClient={apollo} context={context} location={req.url} />
  );

  try {
    await getDataFromTree(app);
  } catch (e) {
    await apollo.clearStore();
  }

  let markup = "";
  let styles = "";
  let apolloState = "";

  try {
    [markup, styles] = renderMarkupWithStyles(app);
  } catch (e) {
    next(e);
    return;
  }

  try {
    apolloState = extractApolloState(apollo);
  } catch (e) {
    apolloState = "";
  }

  res.status(context.statusCode || 200);
  res.send(`
<!doctype html>
<html lang="">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Razzle TypeScript</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="${req.csrfToken()}">
    ${
      assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ""
    }
    ${styles}
    <script>window.__APOLLO_STATE__ = ${apolloState}</script>
    ${
      process.env.NODE_ENV === "production"
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`
    }
  </head>
  <body>
    <div id="root">${markup}</div>
  </body>
</html>
`);
}
