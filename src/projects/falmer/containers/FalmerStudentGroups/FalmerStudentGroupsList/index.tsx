import React from 'react';
import { Link } from 'react-router-dom';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../../components/FalmerDataList';
import ALL_GROUPS_QUERY from './AllGroups.graphql';
import FalmerSubSections, {
  SubSection,
} from '../../../components/FalmerSubSections';
import { StudentGroup } from '~components/OrganisationGrid';
import { HandledQuery } from '~components/HandledQuery';

interface Result {
  allGroups: {
    edges: { node: StudentGroup }[];
  };
}

class AllGroupsQuery extends HandledQuery<Result, {}> {}

function FalmerStudentGroupsList() {
  return (
    <AllGroupsQuery query={ALL_GROUPS_QUERY}>
      {({ data }) => {
        if (!data) {
          return;
        }

        const allGroups = data.allGroups;

        return (
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
        );
      }}
    </AllGroupsQuery>
  );
}

export default FalmerStudentGroupsList as any;
