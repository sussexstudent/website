import React from 'react';
import { StreamFieldBlock } from '~website/containers/content/types';
import StreamField from '~website/containers/content/StreamField';

export const StreamBlock: StreamFieldBlock<any[]> = ({ page, block }) => {
  return <StreamField page={page} items={block} />;
};
