import React from 'react';
import { storiesOf } from '@storybook/react';
import { Storybase } from '../Storybase';
import { SocialMenu } from '../SocialMenu/index';

storiesOf('SocialMenu', module)
  .addDecorator(Storybase())
  .add('default', () => <SocialMenu />);
