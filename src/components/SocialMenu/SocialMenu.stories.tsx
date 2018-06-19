import React from 'react';
import { storiesOf } from '@storybook/react';
import {Storybase} from "~components/Storybase";
import SocialMenu from "~components/SocialMenu/index";

storiesOf('SocialMenu', module)
  .addDecorator(Storybase())
  .add('default', () => (
    <SocialMenu />
  ));
