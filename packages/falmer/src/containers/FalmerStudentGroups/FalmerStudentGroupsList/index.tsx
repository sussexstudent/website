import React from 'react';
import { Link } from 'react-router-dom';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../../components/FalmerDataList';
import { useQuery } from 'react-apollo-hooks';
import ALL_GROUPS_QUERY from './AllGroups.graphql';
import FalmerSubSections, {
  SubSection,
} from '../../../components/FalmerSubSections';
import {StudentGroup} from '@ussu/common/src/types/groups';

interface Result {
  allGroups: {
    edges: { node: StudentGroup }[];
  };
}

const FalmerStudentGroupsList: React.FC = () => {
  const { data, loading } = useQuery<Result>(ALL_GROUPS_QUERY);

  if (loading || !data) {
    return null;
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
};

export default FalmerStudentGroupsList;
