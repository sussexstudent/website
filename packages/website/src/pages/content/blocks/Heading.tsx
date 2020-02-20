import React from 'react';
import slugify from '@ussu/common/src/libs/slugify';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

export type HeadingBlockData = StreamFieldBlockData<
  'heading',
  { value: string }
>;

export const Heading: StreamFieldBlock<HeadingBlockData> = ({
  block: { value },
}) => {
  return (
    <h1>
      <span className="u-position-anchor" id={slugify(value)} />
      {value}
    </h1>
  );
};
