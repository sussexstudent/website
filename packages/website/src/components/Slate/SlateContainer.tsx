import React from 'react';
import ACTIVE_SLATE_QUERY from './ActiveSlate.graphql';
import { SlateLayout } from '../SlateLayout';
import { useQuery } from '@apollo/react-hooks';
import { getAreaBox } from './Boxes/boxes';
import { GetActiveSlateQuery } from '../../generated/graphql';

export const SlateContainer: React.FC = () => {
  const { data, loading } = useQuery<GetActiveSlateQuery>(ACTIVE_SLATE_QUERY);

  if (loading || !data || !data.activeSlate) {
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
