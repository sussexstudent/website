import React from 'react';
import { StreamFieldBlock } from '~website/containers/content/types';

export const TextBlock: StreamFieldBlock<{ value: string }> = ({
  block: { value },
}) => {
  return (
    <div
      className="Prose type-body-copy"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};
