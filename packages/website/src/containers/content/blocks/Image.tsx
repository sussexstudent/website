import React from 'react';
import { StreamFieldBlock } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';
import { OneImage } from '../../../components/OneImage';

export const ImageBlock: StreamFieldBlock<{
  caption: string;
  image: FalmerImage;
}> = ({ block: { caption, image } }) => {
  return (
    <figure>
      <OneImage
        src={image.resource}
        aspectRatio={{ width: image.width, height: image.height }}
        alt=""
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};
