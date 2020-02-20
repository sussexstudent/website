import React from 'react';
import {MoreHomeScreen} from './MoreHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ContentStack} from '../Content/ContentStack';
import {LocalDealsStack} from '../LocalDeals/LocalDealsStack';
import {URFStack} from '../URF/URFStack';

const Stack = createNativeStackNavigator();

export const MoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MoreHome" component={MoreHomeScreen} />
      <Stack.Screen name="ContentHome" component={ContentStack} />
      <Stack.Screen name="LocalDealsHome" component={LocalDealsStack} />
      <Stack.Screen name="URFHome" component={URFStack} />
    </Stack.Navigator>
  );
};
