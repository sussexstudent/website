import React from 'react';
import { graphql } from 'react-apollo';
import AllGroupsQuery from './AllGroups.graphql';
import Loader from '../../Loader';
import FauxRouterLink from '../../FauxRouterLink';

const FalmerStudentGroupsCard = ({ group }) =>
  <div className="FalmerCard FalmerCard--standard">
    <FauxRouterLink href={`/groups/${group.groupId}`} />
    <h2>
      {group.name}
    </h2>
  </div>;

function FalmerStudentGroupsList({ data: { loading, allGroups } }) {
  return (
    <div>
      <h1>Student Groups</h1>
      {loading
        ? <Loader />
        : <div className="FalmerCardGrid FalmerCardGrid--fill">
            {allGroups.edges.map(edge =>
              <FalmerStudentGroupsCard group={edge.node} />
            )}
          </div>}
    </div>
  );
}

export default graphql(AllGroupsQuery)(FalmerStudentGroupsList);
