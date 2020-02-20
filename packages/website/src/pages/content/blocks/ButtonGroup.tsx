import React from 'react';
import StreamField from '../StreamField';
import {
  DocumentLinkBlockData,
  ExternalLinkBlockData,
  InternalLinkBlockData,
} from './Links';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

export type ButtonGroupBlockData = StreamFieldBlockData<
  'button_group_links',
  (ExternalLinkBlockData | InternalLinkBlockData | DocumentLinkBlockData)[]
>;

export const ButtonGroupBlock: StreamFieldBlock<ButtonGroupBlockData> = ({
  page,
  block,
}) => {
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
