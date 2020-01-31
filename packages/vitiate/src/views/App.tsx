import React from 'react';
import client from '../constants/client';
import {ApolloProvider} from '@apollo/react-hooks';
import {NavigationNativeContainer} from '@react-navigation/native';

import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackScreen} from './MainScreens';
import {ModalScreen} from './ModalScreens';
import {Authenticator} from '../components/Authenticator';

enableScreens();

declare var global: {HermesInternal: null | {}};

const RootStack = createStackNavigator();

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="Initial" component={ModalScreen} />
    </RootStack.Navigator>
  );
}

export default () => (
  <NavigationNativeContainer>
    <ApolloProvider client={client}>
      <Authenticator root={RootStackScreen} />
    </ApolloProvider>
  </NavigationNativeContainer>
);
