import { ApolloClient, ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { App } from "./pages/app";

interface Props {
  apolloClient: ApolloClient<any>;
}

export function ClientApp(props: Props) {
  const { apolloClient } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
}
