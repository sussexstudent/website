import React from 'react';
import { StreamFieldBlock } from '~website/containers/content/types';
import { normaliseContentLink } from '~website/containers/content/utils';
import {BlockLink} from "~components/BlockLink";

export const ExternalLink: StreamFieldBlock<{
  link: string;
  target: any;
  title: string;
}> = ({ block: { link, title } }) => {
  return (
    <BlockLink to={normaliseContentLink(link)} external>
      {title}
    </BlockLink>
  );
};

export const InternalLink: StreamFieldBlock<{
  link: {
    path: string;
  };
  target: any;
  title: string;
}> = ({ block: { link, title } }) => {
  return (
    <BlockLink to={link.path}>
      {title}
    </BlockLink>
  );
};
