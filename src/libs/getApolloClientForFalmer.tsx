import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';

const serverSide = typeof localStorage === 'undefined';

const clientEndpoint = serverSide ? null : window.localStorage.getItem('falmerEndpoint');
const link = new HttpLink({
  uri:
    (clientEndpoint === null)
      ? 'https://falmer.sussexstudent.com/graphql'
      : clientEndpoint,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
