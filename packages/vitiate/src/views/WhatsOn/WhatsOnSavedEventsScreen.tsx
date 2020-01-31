import React from 'react';
import { View} from 'react-native';

import {WhatsOnEventList} from "../../components/WhatsOnEventList";
import {Container} from "../../components/Container";
import {ViewHeading} from "../../components/ViewHeading";
import {ScrollableActionBar} from "../../components/ScrollableActionBar";

export const WhatsOnSavedEventsScreen: React.FC = () => {

  return (
    <View>
      <WhatsOnEventList viewerLiked={true} filters={{ }} header={() => (
        () => (
          <View>
            <Container top>
              <ViewHeading>Saved events</ViewHeading>
            </Container>
          </View>
        )
      )} />
    </View>
  );
};
