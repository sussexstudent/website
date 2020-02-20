import React from 'react';
import { normaliseContentLink } from '../utils';
import { BlockLink } from '../../../components/BlockLink';
import { Button } from '../../../components/Button';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

export type ExternalLinkBlockData = StreamFieldBlockData<
  'external_link',
  {
    link: string;
    target: any;
    title: string;
  }
>;

export const ExternalLink: StreamFieldBlock<ExternalLinkBlockData> = ({
  block: { link, title },
}) => {
  return (
    <BlockLink to={normaliseContentLink(link)} external>
      {title}
    </BlockLink>
  );
};

export type InternalLinkBlockData = StreamFieldBlockData<
  'internal_link',
  {
    link: {
      path: string;
      title: string;
    };
    target: any;
    title: string;
  }
>;

export const InternalLink: StreamFieldBlock<InternalLinkBlockData> = ({
  block: { link, title },
}) => {
  return <BlockLink to={link.path}>{title || link.title}</BlockLink>;
};

export type DocumentLinkBlockData = StreamFieldBlockData<
  'document_link',
  {
    url: string;
    title: string;
    resource: string;
  }
>;

export const DocumentLink: StreamFieldBlock<DocumentLinkBlockData> = ({
  block: { url, title },
}) => {
  return <Button href={url}>{title}</Button>;
};
