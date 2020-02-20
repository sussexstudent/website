import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Container} from '../../components/Container';
import {ViewHeading} from '../../components/ViewHeading';

export const WhatsOnFeaturedScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Container top>
          <ViewHeading>Featured events</ViewHeading>
        </Container>
      </View>
    </SafeAreaView>
  );
};
