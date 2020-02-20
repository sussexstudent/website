import React from 'react';

import {WhatsOnHomeScreen} from './WhatsOnHomeScreen';
import {WhatsOnEventDetailScreen} from './WhatsOnEventDetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WhatsOnSavedEventsScreen} from './WhatsOnSavedEventsScreen';
import {WhatsOnFeaturedScreen} from './WhatsOnFeaturedScreen';

const Stack = createNativeStackNavigator();

export const WhatsOnStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={WhatsOnHomeScreen} />
      <Stack.Screen name="EventDetail" component={WhatsOnEventDetailScreen} />
      <Stack.Screen name="SavedEvents" component={WhatsOnSavedEventsScreen} />
      <Stack.Screen name="FeaturedEvents" component={WhatsOnFeaturedScreen} />
    </Stack.Navigator>
  );
};
