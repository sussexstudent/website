import React from 'react';
import { storiesOf } from '@storybook/react';
import AnodyneMenu from "~components/AnodyneMenu/index";

storiesOf('AnodyneMenu', module)
  .add('standard', () => (
    <AnodyneMenu />
));
