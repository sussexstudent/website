import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';

const serverSide = typeof localStorage === 'undefined';

const link = new HttpLink({
  uri:
    serverSide ||
    !Object.hasOwnProperty.call(window.localStorage, 'falmerEndpoint')
      ? 'https://falmer.sussexstudent.com/graphql'
      : window.localStorage.getItem('falmerEndpoint'),
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
