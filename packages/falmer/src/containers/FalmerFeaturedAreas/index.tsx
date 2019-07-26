import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FalmerSlateList } from './FalmerSlateList';
import { FalmerSlateDetail } from './FalmerSlateDetail';

export const FalmerFeaturedAreas: React.FC = () => (
  <Switch>
    <Route path="/featured-areas" exact component={FalmerSlateList} />
    {/*<Route path="/featured-areas/new" exact component={FalmerGroupAwards} />*/}
    <Route path="/featured-areas/:slateId" component={FalmerSlateDetail} />
  </Switch>
);
