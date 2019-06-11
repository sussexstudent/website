import React from 'react';
import ACTIVE_SLATE_QUERY from './ActiveSlate.graphql';
import { SlateLayout } from '../SlateLayout';
import { useQuery } from 'react-apollo-hooks';
import { getAreaBox } from './Boxes/boxes';

export const SlateContainer: React.FC = ({}) => {
  const { data, loading } = useQuery(ACTIVE_SLATE_QUERY);

  if (loading || !data) {
    return null;
  }

  return (
    <SlateLayout
      layout={data.activeSlate.enhancedData.layout}
      areas={data.activeSlate.enhancedData.areas.map((area: any, i: number) => {
        const box = area[0];
        const Box = getAreaBox(box.type);
        return <Box {...box.data} key={i} />;
      })}
    />
  );
};
