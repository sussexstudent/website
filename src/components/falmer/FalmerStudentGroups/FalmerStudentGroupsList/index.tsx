import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import FalmerDataList, { Cell, Row, HeaderCell } from '../../FalmerDataList';
import AllGroupsQuery from './AllGroups.graphql';
import Loader from '../../../Loader';
import FalmerSubSections, { SubSection } from '../../FalmerSubSections';
import { ApolloHandlerChildProps } from '~components/apolloHandler';
import { StudentGroup } from '~components/OrganisationGrid';
import { compose } from 'recompose';

interface OwnProps {}

interface Result {
  allGroups: {
    edges: Array<{ node: StudentGroup }>;
  };
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>;

function FalmerStudentGroupsList({ data: { loading, allGroups } }: IProps) {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <FalmerSubSections>
            <SubSection to="/groups/awards/">Awards</SubSection>
          </FalmerSubSections>
          <FalmerDataList
            items={allGroups.edges.map((edge) => edge.node)}
            header={(rowState) => (
              <Row {...rowState}>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Prospective</HeaderCell>
              </Row>
            )}
            selectable
          >
            {(item: StudentGroup, rowState) => (
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

export default compose<IProps, OwnProps>(graphql(AllGroupsQuery))(
  FalmerStudentGroupsList,
);
