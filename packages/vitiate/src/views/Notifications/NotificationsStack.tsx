import React from 'react';
import {NotificationsHomeScreen} from './NotificationsHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const NotificationsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Notifications" component={NotificationsHomeScreen} />
    </Stack.Navigator>
  );
};
