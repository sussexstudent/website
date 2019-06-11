import React from 'react';
import HeadingHero from '../../../components/HeadingHero';
import { StreamFieldBlock } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';

export const HeadingHeroBlock: StreamFieldBlock<{
  image: FalmerImage;
  heading: string;
}> = ({ page, block }) => {
  return (
    <HeadingHero
      imageURL={block.image.resource}
      title={block.heading || page.title}
    />
  );
};
