import React from 'react';
import {LocalDealsHomeScreen} from './LocalDealsHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const LocalDealsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={LocalDealsHomeScreen} />
    </Stack.Navigator>
  );
};
