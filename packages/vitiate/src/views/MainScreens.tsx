import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ForYouStack} from './ForYou/ForYouStack';
import {WhatsOnStack} from './WhatsOn/WhatsOnStack';
import {GroupsStack} from './Groups/GroupsStack';
import React from 'react';
import {COLORS} from '@ussu/basil/src/style';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, View, Text} from 'react-native';
import {TodayStack} from './Today/TodayStack';
import {MoreStack} from './More/MoreStack';
import {NotificationsHomeScreen} from "./Notifications/NotificationsHomeScreen";

const iconMap: {[screenName: string]: [string, string]} = {
  Today: ['today', 'today'],
  ForYou: ['heart', 'heart'],
  WhatsOn: ['pin', 'pin'],
  Groups: ['people', 'people'],
  More: ['menu', 'menu'],
};

const IconWithBadge: React.FC<{badgeCount?: number}> = ({
  badgeCount,
  children,
}) => {
  return (
    <>
      {children}
      {badgeCount && (
        <View
          style={{
            position: 'absolute',
            right: 21,
            top: 1,
            backgroundColor: COLORS.BRAND_RED,
            borderRadius: 6,
            padding: 1,
            height: 14,
            width: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: '800'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </>
  );
};

const Tab = createBottomTabNavigator();
export function MainStackScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: COLORS.GREY_WINTER,
        activeTintColor: '#fff',
        style: {
          backgroundColor: COLORS.BRAND_PRIMARY,
          shadowColor: COLORS.BRAND_PRIMARY,
          shadowRadius: 6,
          shadowOpacity: 0.2,
          borderTopColor: '#000',
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return (
            <IconWithBadge badgeCount={route.name == 'ForYou' ? 3 : undefined}>
              <Icon
                name={`${Platform.OS === 'ios' ? 'ios' : 'android'}-${
                  iconMap.hasOwnProperty(route.name)
                    ? focused
                      ? iconMap[route.name][1]
                      : iconMap[route.name][0]
                    : 'bug'
                }`}
                size={size}
                color={color}
              />
            </IconWithBadge>
          );
        },
      })}>
      <Tab.Screen
        name="Today"
        options={{
          title: 'Today',
        }}
        component={TodayStack}
      />
      <Tab.Screen
        name="ForYou"
        options={{
          title: 'For you',
        }}
        component={NotificationsHomeScreen}
      />
      <Tab.Screen
        name="WhatsOn"
        options={{
          title: "What's on",
        }}
        component={WhatsOnStack}
      />
      <Tab.Screen
        name="Groups"
        options={{
          title: 'Groups',
        }}
        component={GroupsStack}
      />
      <Tab.Screen
        name="More"
        options={{
          title: 'More',
        }}
        component={MoreStack}
      />
    </Tab.Navigator>
  );
}
