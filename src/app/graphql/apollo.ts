import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export function createClient() {
  const csrfToken = document
    ?.querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

  return new ApolloClient({
    link: createHttpLink({
      uri: "/api/graphql",
      fetchOptions: { credentials: "same-origin" },
      headers: {
        "x-csrf-token": csrfToken,
      },
    }),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    ssrForceFetchDelay: 100,
  });
}
