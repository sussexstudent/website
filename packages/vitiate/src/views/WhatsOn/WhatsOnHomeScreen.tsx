import React from 'react';
import { View} from 'react-native';

import {WhatsOnEventList} from "../../components/WhatsOnEventList";
import {Container} from "../../components/Container";
import {ViewHeading} from "../../components/ViewHeading";
import {ScrollableActionBar} from "../../components/ScrollableActionBar";

export const WhatsOnHomeScreen: React.FC = () => {

  return (
    <View>
      <WhatsOnEventList filters={{}} header={() => (
          <View>
            <Container top>
              <ViewHeading>What's on</ViewHeading>
            </Container>
            <ScrollableActionBar items={[{
              title: 'Featured',
              screen: 'FeaturedEvents'
            }, {
              title: 'Saved',
              screen: 'SavedEvents',
            },
              {
                title: 'Filter',
                screen: 'FilterEvents',
              }]} />
          </View>
      )} />
    </View>
  );
};
