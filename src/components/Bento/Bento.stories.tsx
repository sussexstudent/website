import React from 'react';
import { storiesOf } from '@storybook/react';
import {Bento} from "~components/Bento/index";

storiesOf('Bento', module)
  .add('full', () => (
    <Bento />
  ));
