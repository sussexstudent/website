import React from 'react';
import {StreamFieldBlock} from "~components/content/types";
import StreamField from "~components/content/StreamField";

export const ButtonGroupBlock: StreamFieldBlock<Array<any>> = ({ page, block }) => {
  return (
    <ul>
      <StreamField page={page} items={block} renderItem={({ children, key }) => <li key={key}>{children}</li>} />
    </ul>
  )
};
