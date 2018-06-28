import React from 'react';
import { FalmerSplash } from '../../components/FalmerSplash';
import { withRouter } from 'react-router-dom';

import bookImage from './book.svg';

function FalmerBookMarket() {
  return <FalmerSplash image={bookImage} text="Book Market is coming soon." />;
}

export default withRouter(FalmerBookMarket);
