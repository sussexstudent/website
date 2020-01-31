import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';

import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../../../fragmentTypes.json';

function createClient() {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionQueryResultData as any,
  });

  const link = new HttpLink({
    uri: `https://falmer.sussexstudent.com/graphql/`,
  });

  const cache = new InMemoryCache({fragmentMatcher});

  const authLink = setContext((_, {headers}) => {
    //const token = getMslJwt();

    return {
      headers: {
        ...headers,
        authorization: null ? `Bearer ${null}` : '',
      },
    };
  });

  return new ApolloClient({
    cache,
    link: authLink.concat(link),
  });
}

const client = createClient();

export default client;
