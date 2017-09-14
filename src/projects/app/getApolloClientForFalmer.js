import { ApolloClient, createNetworkInterface } from 'react-apollo';

const serverSide = typeof localStorage === 'undefined';

const networkInterface = createNetworkInterface({
  uri:
    serverSide ||
    !Object.hasOwnProperty.call(window.localStorage, 'falmerEndpoint')
      ? 'https://falmer.sussexstudent.com/graphql'
      : window.localStorage.getItem('falmerEndpoint'),
});

const client = new ApolloClient({
  networkInterface,
});

export default client;
