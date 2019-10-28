import {createStackNavigator} from 'react-navigation-stack';
import {TodayScreen} from './Today';

export const TodayStack = createStackNavigator({
  Today: TodayScreen,
});
