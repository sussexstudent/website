import React from 'react';
import { Router } from '@reach/router';
import FalmerMediaList from './FalmerMediaList';
import FalmerMediaDetail from './FalmerMediaDetail';

function FalmerMedia() {
  return (
    <Router>
      <FalmerMediaList path="/" exact />
      <FalmerMediaDetail path=":mediaId" />
    </Router>
  );
}

export default FalmerMedia;
