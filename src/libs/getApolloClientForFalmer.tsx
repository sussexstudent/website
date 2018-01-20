import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';

const serverSide = typeof localStorage === 'undefined';

const clientEndpoint = serverSide
  ? null
  : window.localStorage.getItem('falmerEndpoint');
const link = new HttpLink({
  uri:
    clientEndpoint === null
      ? 'https://falmer.sussexstudent.com/graphql'
      : clientEndpoint,
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
