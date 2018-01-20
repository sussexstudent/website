import React from 'react';
import { StreamFieldBlock } from '~components/content/types';
import StreamField from '~components/content/StreamField';

export const StreamBlock: StreamFieldBlock<Array<any>> = ({ page, block }) => {
  return <StreamField page={page} items={block} />;
};
