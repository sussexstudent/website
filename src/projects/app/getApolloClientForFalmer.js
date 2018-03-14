import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const serverSide = typeof localStorage === 'undefined';

const link = new HttpLink({
  fetch,
  uri:
    serverSide ||
    !Object.hasOwnProperty.call(window.localStorage, 'falmerEndpoint')
      ? 'https://falmer.sussexstudent.com/graphql/'
      : window.localStorage.getItem('falmerEndpoint'),
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
