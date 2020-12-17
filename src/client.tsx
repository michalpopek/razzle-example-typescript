import React from "react";
import { hydrate } from "react-dom";
import { ClientApp } from "app/client";
import { createClient as createApolloClient } from "app/graphql/apollo";

const apolloClient = createApolloClient();

hydrate(
  <ClientApp apolloClient={apolloClient} />,
  document.querySelector("#root")
);

if (module.hot) {
  module.hot.accept();
}
