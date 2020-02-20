import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {NavigationNativeContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackScreen} from './MainScreens';
import {
  AuthScreen,
  ModalScreen,
  SignInScreen,
  SplashLoadingScreen,
} from './ModalScreens';
import {AuthContext} from '../lib/AuthContext';
import {usePersistedNavigation} from '../hooks/usePersistedNavigation';
import {useAuthenticated} from '../hooks/useAuthenticated';
import {useApolloClient} from '../hooks/useApolloClient';

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

const Stack = createStackNavigator();

export default () => {
  const {isReady, initialState, handleStateChange} = usePersistedNavigation();
  const {client} = useApolloClient();
  const {authContext, state} = useAuthenticated();

  if (!isReady || state.isLoading || !client) {
    return <SplashLoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ApolloProvider client={client}>
        <NavigationNativeContainer
          initialState={initialState}
          onStateChange={handleStateChange}>
          <Stack.Navigator headerMode="none">
            {state.userToken === null ? (
              // No token found, user isn't signed in
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{
                    title: 'Sign in',
                    // When logging out, a pop animation feels intuitive
                    // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen name="Auth" component={AuthScreen} />
              </>
            ) : (
              // User is signed in
              <Stack.Screen name="Home" component={RootStackScreen} />
            )}
          </Stack.Navigator>
        </NavigationNativeContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};
