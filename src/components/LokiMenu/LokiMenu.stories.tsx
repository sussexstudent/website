import React from 'react';
import { storiesOf } from '@storybook/react';
import { LokiMenu } from '~components/LokiMenu/index';
import { Storybase } from '~components/Storybase';

storiesOf('LokiMenu', module)
  .addDecorator(Storybase())
  .add('standard', () => (
    <LokiMenu setCurrentHover={(e) => console.log('hovered', e)} />
  ));
