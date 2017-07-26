import React from 'react';
import { storiesOf } from '@storybook/react';
import ContentCard from './index';

storiesOf('ContentCard', module).add('with text', () =>
  <ContentCard>Hello Content!</ContentCard>
);
