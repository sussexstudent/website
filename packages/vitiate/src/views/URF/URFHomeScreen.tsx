import React from 'react';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {SafeAreaView} from 'react-native';

export const URFHomeScreen: React.FC = ({navigation}) => {
  return (
    <SafeAreaView>
      <Container top>
        <ViewHeading>URF</ViewHeading>
      </Container>
    </SafeAreaView>
  );
};
