import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';

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

const authLink = setContext((_, { headers }) => {
  const token =
    localStorage.getItem('MSL_JWT_OVERRIDE') ||
    (window as any).mslUserInfo.jwt ||
    false;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
} as any);

export default client;
