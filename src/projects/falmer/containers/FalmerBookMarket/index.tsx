import React from 'react';
import { FalmerSplash } from '../../components/FalmerSplash';

import BookImage from '~icons/book.svg';

function FalmerBookMarket() {
  return (
    <FalmerSplash image={<BookImage />} text="Book Market is coming soon." />
  );
}

export default FalmerBookMarket;
