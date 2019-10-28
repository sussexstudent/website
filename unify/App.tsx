import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Navigator} from './views/Navigator';
import {ApolloProvider} from 'react-apollo';
import {client} from './utils/apollo';

const Nav = createAppContainer(Navigator);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Nav />
    </ApolloProvider>
  );
};

export default App;
