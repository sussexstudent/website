import React from 'react';
import { FalmerImage } from '@ussu/common/src/types/events';
import { OneImage } from '../../../components/OneImage';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

export type ImageBlockData = StreamFieldBlockData<
  'image',
  {
    caption: string;
    alternativeTitle: string;
    image: FalmerImage;
  }
>;

export const ImageBlock: StreamFieldBlock<ImageBlockData> = ({
  block: { caption, image, alternativeTitle },
}) => {
  return (
    <figure>
      <OneImage
        src={image.resource}
        aspectRatio={{ width: image.width, height: image.height }}
        alt={alternativeTitle}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};
