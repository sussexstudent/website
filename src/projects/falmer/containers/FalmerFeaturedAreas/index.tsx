import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FalmerSlateList } from '~falmer/containers/FalmerFeaturedAreas/FalmerSlateList';
import { FalmerSlateDetail } from '~falmer/containers/FalmerFeaturedAreas/FalmerSlateDetail';

const FalmerFeaturedAreas: React.FC = () => (
  <Switch>
    <Route path="/featured-areas" exact component={FalmerSlateList} />
    {/*<Route path="/featured-areas/new" exact component={FalmerGroupAwards} />*/}
    <Route path="/featured-areas/:slateId" component={FalmerSlateDetail} />
  </Switch>
);

export default FalmerFeaturedAreas;
