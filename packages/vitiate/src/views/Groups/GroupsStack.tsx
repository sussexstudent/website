import React from 'react';
import {GroupsHomeScreen} from './GroupsHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const GroupsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={GroupsHomeScreen} />
    </Stack.Navigator>
  );
};
