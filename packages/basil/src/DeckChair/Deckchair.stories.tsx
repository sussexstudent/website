import React from 'react';
import { Deckchair } from '../../../website/src/components/Deckchair/index';

export default { title: 'Deckchair' };

export const Default = () => (
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
);
