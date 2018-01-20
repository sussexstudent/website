import React from 'react';
import {StreamFieldBlock} from "~components/content/types";
import {FalmerImage} from "../../../types/events";
import Image from "~components/Image";

export const ImageBlock: StreamFieldBlock<{ caption: string; image: FalmerImage }> = ({ block: { caption, image } }) => {
  return (
    <figure>
      <Image src={image.resource} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};
