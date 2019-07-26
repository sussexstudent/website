import React from 'react';
import { FalmerSplash } from '../../components/FalmerSplash';

import BookImage from '@ussu/common/src/icons/book.svg';

export const FalmerBookMarket: React.FC = () => (
  <FalmerSplash image={<BookImage />} text="Book Market is coming soon." />
);
