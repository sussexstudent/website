import React from 'react';
import {ForYouHomeScreen} from './ForYouHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const ForYouStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={ForYouHomeScreen} />
    </Stack.Navigator>
  );
};
