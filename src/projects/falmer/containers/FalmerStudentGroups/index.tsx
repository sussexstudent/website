import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FalmerStudentGroupsList from './FalmerStudentGroupsList';
import FalmerStudentGroupsDetail from './FalmerStudentGroupsDetail';
import FalmerGroupAwards from '../FalmerGroupAwards';

function FalmerStudentGroups() {
  return (
    <Switch>
      <Route path="/groups" exact component={FalmerStudentGroupsList} />
      <Route path="/groups/awards" exact component={FalmerGroupAwards} />
      <Route path="/groups/:groupId" component={FalmerStudentGroupsDetail} />
    </Switch>
  );
}

export default FalmerStudentGroups;
