import React from 'react';
import { storiesOf } from '@storybook/react';
import {Storybase} from "~components/Storybase";
import {LokiHeader} from "~components/LokiHeader/index";

storiesOf('LokiHeader', module)
  .addDecorator(Storybase())
  .add('standard', () => <LokiHeader />);
