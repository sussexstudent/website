import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../lib/AuthContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AuthScreen,
  ModalScreen,
  SignInScreen,
  SplashLoadingScreen,
} from '../views/ModalScreens';
import {useNavigation} from '@react-navigation/native';

interface State {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

const reducer = (prevState: State, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: undefined,
      };
  }
};

const Stack = createStackNavigator();

export const Authenticator: React.FC<{root: React.FC}> = ({root}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator headerMode="none">
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={SplashLoadingScreen} />
        ) : state.userToken === null ? (
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
          <Stack.Screen name="Home" component={root} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};
