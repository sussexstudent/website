import storage, {saveToken} from '../lib/storage';
import {useEffect, useMemo, useReducer} from 'react';

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

export const useAuthenticated = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let auth;

      try {
        auth = await storage.get('auth');
        dispatch({type: 'RESTORE_TOKEN', token: auth});
      } catch (e) {
        dispatch({type: 'RESTORE_TOKEN', token: null});
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log(data);
        await saveToken(data);
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => {
        storage.clearStorage();
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return {authContext, state};
};
