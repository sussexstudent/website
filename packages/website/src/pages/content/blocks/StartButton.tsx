import React from 'react';
import { InternalAppLink } from '../../../components/InternalAppLink';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

export type StartButtonBlockData = StreamFieldBlockData<
  'start_button',
  {
    title: string;
    link: any;
    page: any;
  }
>;

export const StartButtonBlock: StreamFieldBlock<StartButtonBlockData> = ({
  block: { title, link, page },
}) => {
  return (
    <InternalAppLink
      className="Button Button--start ContentBlock"
      to={link || page.path}
    >
      {title || 'Start now'} ›
    </InternalAppLink>
  );
};
