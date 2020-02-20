import React from 'react';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {SafeAreaView} from 'react-native';

export const ForYouHomeScreen: React.FC = ({navigation}) => {
  return (
    <SafeAreaView>
      <Container top>
        <ViewHeading>For you</ViewHeading>
      </Container>
    </SafeAreaView>
  );
};
