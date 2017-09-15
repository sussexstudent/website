import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens, registerScreenVisibilityListener } from './screens';
import getApolloClientForFalmer from './getApolloClientForFalmer';

// screen related book keeping
registerScreens({}, getApolloClientForFalmer);
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
    icon: require('./img/TabBalloon.png'),
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
    tabBarBackgroundColor: '#003a66',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    navigationBarColor: '#003a66',
    navBarBackgroundColor: '#003a66',
    statusBarColor: '#002b4c',
    tabFontFamily: 'BioRhyme-Bold',
  },
  appStyle: {
    tabBarBackgroundColor: '#1db8a4',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    navigationBarColor: '#1db8a4',
    navBarBackgroundColor: '#1db8a4',
    statusBarColor: '#1db8a4',
    tabFontFamily: 'BioRhyme-Bold',
  },
  // drawer: {
  //   left: {
  //     screen: 'example.Types.Drawer',
  //   },
  // },
});
