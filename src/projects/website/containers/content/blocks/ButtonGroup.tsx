import React from 'react';
import { StreamFieldBlock } from '~website/containers/content/types';
import StreamField from '~website/containers/content/StreamField';

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
