import React from 'react';
import { storiesOf } from '@storybook/react';
import BackBar from '../BackBar/index';

storiesOf('BackBar', module).add('standard', () => (
  <BackBar href="http://sussexstudent.com/">What's on</BackBar>
));
