import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FalmerStudentGroupsList from './FalmerStudentGroupsList';
import FalmerStudentGroupsDetail from './FalmerStudentGroupsDetail';
import FalmerGroupAwards from '../FalmerGroupAwards';

export const FalmerStudentGroups: React.FC = () => (
  <Switch>
    <Route path="/groups" exact component={FalmerStudentGroupsList} />
    <Route path="/groups/awards" exact component={FalmerGroupAwards} />
    <Route path="/groups/:groupId" component={FalmerStudentGroupsDetail} />
  </Switch>
);
