import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { View, Text } from 'react-native';
import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';
import WhatsOnList from './WhatsOn';
import StudentGroupList from './StudentGroupList';
import EventDetail from './EventDetail';
import GroupDetail from './GroupDetail';

const Feedback = () => (
  <View>
    <Text>Feedback</Text>
  </View>
);

export function registerScreens(store, client) {
  Navigation.registerComponent(
    'ussu.WhatsOn',
    () => WhatsOnList,
    store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    'ussu.WhatsOn.EventDetail',
    () => EventDetail,
    store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    'ussu.Groups',
    () => StudentGroupList,
    store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    'ussu.Groups.GroupDetail',
    () => GroupDetail,
    store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    'ussu.Feedback',
    () => Feedback,
    store,
    ApolloProvider,
    { client }
  );
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({ screen }) => console.log(`Displaying screen ${screen}`),
    didAppear: ({ screen, startTime, endTime, commandType }) =>
      console.log(
        'screenVisibility',
        `Screen ${screen} displayed in ${endTime -
          startTime} millis [${commandType}]`
      ),
    willDisappear: ({ screen }) =>
      console.log(`Screen will disappear ${screen}`),
    didDisappear: ({ screen }) => console.log(`Screen disappeared ${screen}`),
  }).register();
}
