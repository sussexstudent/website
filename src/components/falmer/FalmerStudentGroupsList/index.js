import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import FalmerDataList, { Cell, Row, HeaderCell } from '../FalmerDataList/index';
import AllGroupsQuery from './AllGroups.graphql';
import Loader from '../../Loader';

function FalmerStudentGroupsList({ data: { loading, allGroups } }) {
  return (
    <div>
      {loading
        ? <Loader />
        : <FalmerDataList
            items={allGroups.edges.map(edge => edge.node)}
            header={rowState =>
              <Row {...rowState}>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Prospective</HeaderCell>
              </Row>}
            selectable
          >
            {(item, rowState) =>
              <Row {...rowState} id={item.id}>
                <Cell>
                  <Link to={`/groups/${item.groupId}`}>
                    {item.name}
                  </Link>
                </Cell>
                <Cell>
                  {item.isProspective ? 'yes' : ''}
                </Cell>
              </Row>}
          </FalmerDataList>}
    </div>
  );
}

export default graphql(AllGroupsQuery)(FalmerStudentGroupsList);
