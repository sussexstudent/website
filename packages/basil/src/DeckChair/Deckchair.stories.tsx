import React from 'react';
import { Deckchair } from '../../../website/src/components/Deckchair/index';

export default { title: 'Deckchair' };

const colors = ['red', 'green'];

export const Default = () => (
  <div>
    {colors.map((c) => (
      <Deckchair
        header="Some short header"
        about="This is some simple about text"
        color={c}
      />
    ))}
  </div>
);
