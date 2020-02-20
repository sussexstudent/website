import React from 'react';
import { HeadingHero } from '../../../components/HeadingHero';
import { FalmerImage } from '@ussu/common/src/types/events';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

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
