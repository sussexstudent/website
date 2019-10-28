import {createBottomTabNavigator} from 'react-navigation-tabs';
import {TodayStack} from './Today';
import {ForYouStack} from './ForYou';

export const Navigator = createBottomTabNavigator({
  Today: TodayStack,
  ForYou: ForYouStack,
  // Settings: SettingsScreen,
});
