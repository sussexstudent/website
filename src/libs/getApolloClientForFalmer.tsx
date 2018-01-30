import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import getFalmerEndpoint from "~libs/getFalmerEndpoint";

const link = new HttpLink({
  uri: getFalmerEndpoint(),
});
const cache = new InMemoryCache();

if (typeof window !== 'undefined') {
  const fullState = Object.assign({}, ...(window as any).apolloPartials);
  fullState.ROOT_QUERY = Object.assign(
    {},
    ...(window as any).apolloPartials.map((state: any) => state.ROOT_QUERY),
  );
  cache.restore(fullState);
}

const client = new ApolloClient({
  link,
  cache,
});

export default client;
