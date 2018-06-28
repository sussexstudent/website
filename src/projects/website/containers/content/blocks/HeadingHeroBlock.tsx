import React from 'react';
import HeadingHero from '~components/HeadingHero';
import { StreamFieldBlock } from '~website/containers/content/types';
import { FalmerImage } from '~types/events';

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
