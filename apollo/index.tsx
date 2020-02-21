import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import withApollo from "next-with-apollo";
import fetch from "node-fetch";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { SERVER_ADDRESS }
} = getConfig();

const link = new HttpLink({
  uri: `${SERVER_ADDRESS}/api/graphql`,
  fetch: fetch as any
});

export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            console.error({ graphQLErrors });
          }
          if (networkError) {
            console.error({ networkError });
          }
        }),
        link
      ]),
      //  rehydrate the cache using the initial data passed from the server:
      cache: new InMemoryCache().restore(initialState || {})
    })
);
