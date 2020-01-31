import React from 'react';
import { View} from 'react-native';
import {Container} from "../../components/Container";
import {ViewHeading} from "../../components/ViewHeading";

export const WhatsOnFeaturedScreen: React.FC = () => {

  return (
    <View>
      <Container top>
        <ViewHeading>Featured events</ViewHeading>
      </Container>
    </View>
  );
};
