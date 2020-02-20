import React from 'react';
import {URFHomeScreen} from './URFHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const URFStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="URFHome" component={URFHomeScreen} />
    </Stack.Navigator>
  );
};
