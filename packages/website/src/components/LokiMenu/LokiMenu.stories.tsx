import React from 'react';
import { storiesOf } from '@storybook/react';
import { LokiMenu } from './index';
import { Storybase } from '../Storybase';

storiesOf('LokiMenu', module)
  .addDecorator(Storybase())
  .add('standard', () => (
    <LokiMenu setCurrentHover={(e) => console.log('hovered', e)} />
  ));
