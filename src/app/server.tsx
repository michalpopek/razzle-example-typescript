import { ApolloClient, ApolloProvider } from "@apollo/client";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { App } from "./pages/app";

interface Props {
  apolloClient: ApolloClient<any>;
  location: string;
  context: any;
}

export function ServerApp(props: Props) {
  const { apolloClient, location, context } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <StaticRouter context={context} location={location}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );
}
