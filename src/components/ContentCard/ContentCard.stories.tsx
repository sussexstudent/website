import React from 'react';
import { storiesOf } from '@storybook/react';
import ContentCard from '~components/ContentCard/index';

storiesOf('ContentCard', module).add('main', () => (
  <ContentCard>
    <h1>Hello there</h1>
    <h2>This is a content card with content inside.</h2>
  </ContentCard>
));
