import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';
import { getMslJwt } from '~libs/getMslJwt';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData as any,
});

const link = new HttpLink({
  uri: `${getFalmerEndpoint()}/graphql/`,
});
const cache = new InMemoryCache({ fragmentMatcher });

if (typeof window !== 'undefined' && (window as any).apolloPartials) {
  const fullState = Object.assign({}, ...(window as any).apolloPartials);
  fullState.ROOT_QUERY = Object.assign(
    {},
    ...(window as any).apolloPartials.map((state: any) => state.ROOT_QUERY),
  );
  cache.restore(fullState);
}

const authLink = setContext((_, { headers }) => {
  const token = getMslJwt();

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
  connectToDevTools: true,
});

export default client;
