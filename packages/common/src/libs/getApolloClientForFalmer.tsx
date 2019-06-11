import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import getFalmerEndpoint from '@ussu/common/src/libs/getFalmerEndpoint';
import { getMslJwt } from '@ussu/common/src/libs/getMslJwt';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../fragmentTypes.json';

function createClient() {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionQueryResultData as any,
  });

  let link;

  if (typeof fetch === 'undefined') {
    const fetch = require('node-fetch');
    link = new HttpLink({
      fetch,
      uri: `${getFalmerEndpoint()}/graphql/`,
    });
  } else {
    link = new HttpLink({
      uri: `${getFalmerEndpoint()}/graphql/`,
    });
  }

  const cache = new InMemoryCache({ fragmentMatcher });

  if (typeof window !== 'undefined') {
    if ((window as any).apolloPartials) {
      const fullState = Object.assign({}, ...(window as any).apolloPartials);
      fullState.ROOT_QUERY = Object.assign(
        {},
        ...(window as any).apolloPartials.map((state: any) => state.ROOT_QUERY),
      );
      cache.restore(fullState);
    } else if (window.hasOwnProperty('__APOLLO_STATE__')) {
      cache.restore((window as any).__APOLLO_STATE__);
    }
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

  return new ApolloClient({
    cache,
    link: authLink.concat(link),
    connectToDevTools: true,
  });
}

const client = createClient();

export default client;
