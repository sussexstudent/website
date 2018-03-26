import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { registerScreens, registerScreenVisibilityListener } from './screens';
import apolloClientForFalmer from './getApolloClientForFalmer';
import { colors } from './vars';

// screen related book keeping
const store = createStore((x) => x,  {});
registerScreens(store, apolloClientForFalmer);
registerScreenVisibilityListener();

const tabs = [
  {
    label: `What's on`,
    screen: 'ussu.WhatsOn',
    icon: require('./img/TabBalloon.png'),
    title: "What's on",
  },
  {
    label: 'Groups',
    screen: 'ussu.Groups',
    icon: require('./img/TabGroups.png'),
    title: 'Student Groups',
  },
];
//
// if (Platform.OS === 'android') {
//   tabs.push({
//     label: 'Transitions',
//     screen: 'example.Transitions',
//     icon: require('../img/transform.png'),
//     title: 'Navigation Transitions',
//   });
// }

// this will start our app
Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
    tabBarBackgroundColor: colors.brandRed,
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    tabBarTextColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffffff',
    navigationBarColor: colors.brandRed,
    navBarBackgroundColor: colors.brandRed,
    statusBarColor: '#002b4c',
    tabFontFamily: 'San Francisco, Roboto',
  },
  appStyle: {
    tabBarBackgroundColor: '#1db8a4',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    navigationBarColor: colors.brandGreen,
    navBarBackgroundColor: colors.brandGreen,
    statusBarColor: colors.brandGreen,
    tabFontFamily: 'San Francisco, Roboto',
  },
  // drawer: {
  //   left: {
  //     screen: 'example.Types.Drawer',
  //   },
  // },
});
