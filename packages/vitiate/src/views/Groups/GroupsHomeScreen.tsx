import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {ViewHeading} from '../../components/ViewHeading';
import {ScrollableActionBar} from '../../components/ScrollableActionBar';
import {Container} from '../../components/Container';

export const GroupsHomeScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <Container top>
        <ViewHeading>Your Groups</ViewHeading>
      </Container>
      <ScrollableActionBar
        items={[
          {
            title: 'Recent posts',
            screen: 'GroupsRecentPosts',
          },
          {
            title: 'Discover',
            screen: 'GroupsDiscover',
          },
          {
            title: 'Society Handbook',
            screen: 'DiscoverGroups',
          },
        ]}
      />
    </SafeAreaView>
  );
};
