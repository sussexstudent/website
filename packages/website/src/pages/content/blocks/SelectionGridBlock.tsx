import React from 'react';
import { FalmerImage } from '@ussu/common/src/types/events';
import { SelectionGridItem } from '../../../components/SelectionGridItem';
import { SelectionGrid } from '../../../components/SelectionGrid';
import { normaliseContentLink } from '../utils';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

export type SelectionGridItemData = StreamFieldBlockData<
  'selection_grid',
  {
    title: string;
    link: string;
    description: string;
    image: FalmerImage;
  }[]
>;

export const SelectionGridBlock: StreamFieldBlock<SelectionGridItemData> = ({
  block,
}) => {
  return (
    <SelectionGrid>
      {block.map((
        item: any, // todo
      ) => (
        <SelectionGridItem
          key={item.link}
          title={item.title}
          link={normaliseContentLink(item.link)}
          imageURL={item.image.resource}
          description={item.description}
        />
      ))}
    </SelectionGrid>
  );
};
