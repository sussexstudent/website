import React from 'react';
import { storiesOf } from '@storybook/react';
import { Storybase } from '../Storybase';
import { LokiHeader } from '../LokiHeader/index';

storiesOf('LokiHeader', module)
  .addDecorator(Storybase())
  .add('standard', () => <LokiHeader />);
