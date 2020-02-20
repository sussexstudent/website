import React from 'react';
import {GroupsHomeScreen} from './GroupsHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GroupsDiscoverScreen} from './GroupsDiscoverScreen';
import {GroupDetailHomeScreen} from './GroupDetailHomeScreen';

const Stack = createNativeStackNavigator();

export const GroupsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="Home"
        options={{title: 'Your Groups'}}
        component={GroupsHomeScreen}
      />
      <Stack.Screen
        name="GroupsDiscover"
        options={{title: 'Discover Groups'}}
        component={GroupsDiscoverScreen}
      />
      <Stack.Screen
        name="GroupDetail"
        options={{title: 'Group'}}
        component={GroupDetailHomeScreen}
      />
    </Stack.Navigator>
  );
};
