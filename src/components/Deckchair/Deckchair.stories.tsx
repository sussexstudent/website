import React from 'react';
import { storiesOf } from '@storybook/react';
import Deckchair from '~components/Deckchair/index';

storiesOf('Deckchair', module).add('default', () => (
  <div>
    <Deckchair
      header="Some short header"
      about="This is some simple about text"
      color="red"
    />
    <Deckchair
      header="Some short header"
      about="This is some simple about text"
      color="green"
    />
  </div>
));
