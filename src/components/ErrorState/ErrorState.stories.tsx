import React from 'react';
import { storiesOf } from '@storybook/react';
import {ErrorState} from "~components/ErrorState/index";

storiesOf('ErrorState', module).add('default', () => (
  <div>
    <ErrorState />
  </div>
));
