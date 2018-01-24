import React from 'react';
import { StreamFieldBlock } from '~components/content/types';
import { FalmerImage } from '../../../types/events';
import SelectionGridItem from '~components/SelectionGridItem';
import SelectionGrid from '~components/SelectionGrid';

interface SelectionGridItemData {
  title: string;
  link: string;
  image: FalmerImage;
}

export const SelectionGridBlock: StreamFieldBlock<
  SelectionGridItemData[]
> = ({ block }) => {
  return (
    <SelectionGrid>
      {block.map((
        item: any, // todo
      ) => (
        <SelectionGridItem
          title={item.title}
          link={item.link}
          imageURL={item.image.resource}
        />
      ))}
    </SelectionGrid>
  );
};
