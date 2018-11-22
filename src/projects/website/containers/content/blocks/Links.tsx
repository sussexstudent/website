import React from 'react';
import { StreamFieldBlock } from '~website/containers/content/types';
import { normaliseContentLink } from '~website/containers/content/utils';
import { BlockLink } from '~components/BlockLink';
import Button from '~components/Button';

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
    title: string;
  };
  target: any;
  title: string;
}> = ({ block: { link, title } }) => {
  return <BlockLink to={link.path}>{title || link.title }</BlockLink>;
};

export const DocumentLink: StreamFieldBlock<{
  url: string;
  title: string;
}> = ({ block: { url, title } }) => {
  return <Button href={url}>{title}</Button>;
};
