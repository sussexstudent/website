import React from 'react';
import { storiesOf } from '@storybook/react';
import ContentNavigation from './index';

storiesOf('ContentNavigation', module).add('default', () =>
  <ContentNavigation
    activeKey="boats"
    items={[
      { anchor: 'animals', name: 'Animals' },
      { anchor: 'boats', name: 'Boats' },
      { anchor: 'cars', name: 'Cars' },
    ]}
  />
);
