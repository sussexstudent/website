import React from 'react';
import { Link } from 'react-router-dom';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../../components/FalmerDataList';
import { useQuery } from '@apollo/react-hooks';
import ALL_SLATES_QUERY from './AllSlates.graphql';
import { format } from 'date-fns';

interface Slate {
  id: number;
  slateId: number;
  data: any;
  displayFrom: string;
}

interface Result {
  allSlates: {
    edges: { node: Slate }[];
  };
}

export const FalmerSlateList: React.FC = () => {
  const { data, loading } = useQuery<Result>(ALL_SLATES_QUERY);

  if (loading || !data) {
    return null;
  }

  const allSlates = data.allSlates;

  return (
    <div>
      <FalmerDataList
        items={allSlates.edges.map((edge) => edge.node)}
        header={(rowState) => (
          <Row {...rowState}>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Displaying from</HeaderCell>
          </Row>
        )}
        selectable
      >
        {(item: Slate, rowState) => (
          <Row {...rowState} id={item.id}>
            <Cell>
              <Link to={`/featured-areas/${item.slateId}`}>
                {JSON.stringify(item.data)}
              </Link>
            </Cell>
            <Cell>
              {item.displayFrom
                ? format(new Date(item.displayFrom), 'EEE do MMM HH:mm')
                : ''}
            </Cell>
          </Row>
        )}
      </FalmerDataList>
    </div>
  );
};
