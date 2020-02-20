import React from 'react';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {SafeAreaView, Text} from 'react-native';
import {useViewer} from '@ussu/website/src/pages/bookmarket/currentUserData';
import {TodaySliceOutletsProps} from './TodaySlices/Outlets';
import {TodaySliceAdvertProps} from './TodaySlices/Adverts';

export const TodayHomeScreen: React.FC = ({navigation}) => {
  const viewer = useViewer();

  return (
    <SafeAreaView>
      <Container top>
        <ViewHeading>Today</ViewHeading>
        <Text style={{fontSize: 24, fontWeight: '700'}}>
          Hey {viewer.currentUser?.name ?? 'there'}!
        </Text>
      </Container>

      <TodaySliceOutletsProps />
      <TodaySliceAdvertProps />
    </SafeAreaView>
  );
};
