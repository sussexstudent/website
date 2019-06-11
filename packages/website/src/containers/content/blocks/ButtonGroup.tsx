import React from 'react';
import { StreamFieldBlock } from '../types';
import StreamField from '../StreamField';

export const ButtonGroupBlock: StreamFieldBlock<any[]> = ({ page, block }) => {
  return (
    <ul className="List List--reset">
      <StreamField
        page={page}
        items={block}
        renderItem={({ children, key }) => <li key={key}>{children}</li>}
      />
    </ul>
  );
};
