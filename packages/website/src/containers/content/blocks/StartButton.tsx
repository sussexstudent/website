import React from 'react';
import { StreamFieldBlock } from '../types';
import { InternalAppLink } from '../../../components/InternalAppLink';

export const StartButtonBlock: StreamFieldBlock<{
  title: string;
  link: any;
  page: any;
}> = ({ block: { title, link, page } }) => {
  return (
    <InternalAppLink
      className="Button Button--start ContentBlock"
      to={link || page.path}
    >
      {title || 'Start now'} ›
    </InternalAppLink>
  );
};
