import React from 'react';
import { StreamFieldBlock } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';
import SelectionGridItem from '../../../components/SelectionGridItem';
import SelectionGrid from '../../../components/SelectionGrid';
import { normaliseContentLink } from '../utils';

interface SelectionGridItemData {
  title: string;
  link: string;
  image: FalmerImage;
}

export const SelectionGridBlock: StreamFieldBlock<SelectionGridItemData[]> = ({
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
        />
      ))}
    </SelectionGrid>
  );
};
