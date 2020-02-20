import React from 'react';
import {ContentHomeScreen} from './ContentHomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ContentPageScreen} from './ContentPageScreen';

const Stack = createNativeStackNavigator();

export const ContentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="KnowledgeBaseHome" component={ContentHomeScreen} />
      <Stack.Screen name="KnowledgeBasePage" component={ContentPageScreen} />
    </Stack.Navigator>
  );
};
