import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FalmerMediaList from './FalmerMediaList';
import FalmerMediaDetail from './FalmerMediaDetail';

function FalmerMedia() {
  return (
    <Switch>
      <Route path="/media" exact component={FalmerMediaList} />
      <Route path="/media/:mediaId" component={FalmerMediaDetail} />
    </Switch>
  );
}

export default FalmerMedia;
