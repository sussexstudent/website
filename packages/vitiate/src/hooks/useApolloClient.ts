import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../../../fragmentTypes.json';
import storage from '../lib/storage';
import {useEffect, useState} from 'react';
import {persistCache} from 'apollo-cache-persist';

export const useApolloClient = () => {
  const [client, setClient] = useState<undefined | ApolloClient<any>>(
    undefined,
  );

  useEffect(() => {
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: introspectionQueryResultData as any,
    });

    const link = new HttpLink({
      uri: `https://falmer.sussexstudent.com/graphql/`,
    });

    const cache = new InMemoryCache({fragmentMatcher});

    const authLink = setContext(async (_, {headers}) => {
      const token = await storage.get('auth');
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
    });

    // See above for additional options, including other storage providers.
    persistCache({
      cache,
      storage: {
        getItem: storage.get.bind(storage),
        setItem: storage.set.bind(storage),
        removeItem: storage.remove.bind(storage),
      },
    }).then(() => {
      client.onResetStore(async () => cache.writeData({data: {}}));
      setClient(client);
    });
    return () => {};
  }, []);

  return {client};
};
