import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import FalmerDataList, { Cell, Row, HeaderCell } from '../../FalmerDataList';
import AllGroupsQuery from './AllGroups.graphql';
import Loader from '../../../Loader';
import FalmerSubSections from '../../FalmerSubSections';

function FalmerStudentGroupsList({ data: { loading, allGroups } }) {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <FalmerSubSections>
            <FalmerSubSections.Section to="/groups/awards/">
              Awards
            </FalmerSubSections.Section>
          </FalmerSubSections>
          <FalmerDataList
            items={allGroups.edges.map(edge => edge.node)}
            header={rowState => (
              <Row {...rowState}>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Prospective</HeaderCell>
              </Row>
            )}
            selectable
          >
            {(item, rowState) => (
              <Row {...rowState} id={item.id}>
                <Cell>
                  <Link to={`/groups/${item.groupId}`}>{item.name}</Link>
                </Cell>
                <Cell>{item.isProspective ? 'yes' : ''}</Cell>
              </Row>
            )}
          </FalmerDataList>
        </div>
      )}
    </div>
  );
}

export default graphql(AllGroupsQuery)(FalmerStudentGroupsList);
