import React from 'react';
import { StreamFieldBlock } from '../types';
import StreamField from '../StreamField';

export const StreamBlock: StreamFieldBlock<any[]> = ({ page, block }) => {
  return <StreamField page={page} items={block} />;
};
