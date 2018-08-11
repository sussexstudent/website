import React from 'react';
import { Router } from '@reach/router';
import FalmerStudentGroupsList from './FalmerStudentGroupsList';
import FalmerStudentGroupsDetail from './FalmerStudentGroupsDetail';
import FalmerGroupAwards from '../FalmerGroupAwards';

function FalmerStudentGroups() {
  return (
    <Router>
      <FalmerStudentGroupsList path="/" exact />
      <FalmerGroupAwards path="awards" exact />
      <FalmerStudentGroupsDetail path=":groupId" />
    </Router>
  );
}

export default FalmerStudentGroups;
