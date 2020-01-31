import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ForYouStack} from './ForYou/ForYouStack';
import {WhatsOnStack} from './WhatsOn/WhatsOnStack';
import {GroupsStack} from './Groups/GroupsStack';
import React from 'react';

const Tab = createBottomTabNavigator();
export function MainStackScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ForYou" component={ForYouStack} />
      <Tab.Screen name="WhatsOn" component={WhatsOnStack} />
      <Tab.Screen name="Groups" component={GroupsStack} />
    </Tab.Navigator>
  );
}
