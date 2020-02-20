import React from 'react';
import {TodayHomeScreen} from './TodayHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const TodayStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TodayHome" component={TodayHomeScreen} />
    </Stack.Navigator>
  );
};
