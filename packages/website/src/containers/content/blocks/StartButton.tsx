import React from 'react';
import { StreamFieldBlock, StreamFieldBlockData } from '../types';
import { InternalAppLink } from '../../../components/InternalAppLink';

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
