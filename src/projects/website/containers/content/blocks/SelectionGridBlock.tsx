import React from 'react';
import { StreamFieldBlock } from '~website/containers/content/types';
import { FalmerImage } from '~types/events';
import SelectionGridItem from '~components/SelectionGridItem';
import SelectionGrid from '~components/SelectionGrid';
import { normaliseContentLink } from '~website/containers/content/utils';

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
