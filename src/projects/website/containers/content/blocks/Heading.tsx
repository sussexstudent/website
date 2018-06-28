import React from 'react';
import { StreamFieldBlock } from '~website/containers/content/types';
import slugify from '~libs/slugify';

export const Heading: StreamFieldBlock<{ value: string }> = ({
  block: { value },
}) => {
  return (
    <h1>
      <span className="u-position-anchor" id={slugify(value)} />
      {value}
    </h1>
  );
};
