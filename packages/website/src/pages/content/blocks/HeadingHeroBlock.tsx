import React from 'react';
import { HeadingHero } from '../../../components/HeadingHero';
import { StreamFieldBlock, StreamFieldBlockData } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';

export type HeadingHeroBlockData = StreamFieldBlockData<
  'heading_hero',
  {
    image: FalmerImage;
    heading: string;
  }
>;

export const HeadingHeroBlock: StreamFieldBlock<HeadingHeroBlockData> = ({
  page,
  block,
}) => {
  return (
    <HeadingHero
      imageURL={block.image.resource}
      title={block.heading || page.title}
    />
  );
};
