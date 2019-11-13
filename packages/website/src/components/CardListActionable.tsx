import React, { useState } from 'react';
import { COLORS } from '@ussu/basil/src/style';
import { DocumentLinkBlockData } from '../pages/content/blocks/Links';
import { StreamFieldBlock } from '../pages/content/types';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import { Modal } from './Modal';

export const CardListActionable: React.FC = ({ children }) => {
  return (
    <ul
      css={[
        type(TypeSize.Pica, Typeface.Secondary),
        {
          padding: 0,
          margin: 0,
          listStyle: 'none',
          fontWeight: 600,
        },
      ]}
    >
      {children}
    </ul>
  );
};

export const CardListActionableItem: React.FC<{
  to: string;
  onClick?: (e: any) => void;
}> = ({ children, to, onClick }) => {
  return (
    <li
      css={{
        display: 'block',
        borderBottom: `1px solid ${COLORS.GREY_SUMMER}`,
      }}
    >
      <a
        href={to}
        onClick={onClick}
        css={{
          display: 'flex',
          textDecoration: 'none',
          padding: '0.4rem 0',
          transition: '300ms background ease',
          '&:hover': {
            background: COLORS.GREY_SUMMER,
          },
        }}
      >
        <span css={{ flex: 'auto' }}>{children}</span> ›
      </a>
    </li>
  );
};

export const CardListActionableDocumentLink: StreamFieldBlock<
  DocumentLinkBlockData
> = ({ block: { url, title, resource } }) => {
  const [isPreviewing, setPreviewing] = useState(false);
  const target = `http://falmer-content.s3-eu-west-1.amazonaws.com/${resource}`;
  return (
    <React.Fragment>
      <CardListActionableItem
        to={target}
        onClick={(e) => {
          e.preventDefault();
          setPreviewing(true);
        }}
      >
        {title}
      </CardListActionableItem>
      <Modal
        footerClose
        isOpen={isPreviewing}
        onRequestClose={() => {
          setPreviewing(false);
        }}
      >
        {url.endsWith('.pdf') ? (
          <iframe
            css={{ height: '80vh', width: '100%', border: 0 }}
            src={`https://docs.google.com/gview?url=${target}&embedded=true`}
          />
        ) : null}
        {url.endsWith('.png') || url.endsWith('.jpg') ? (
          <div>
            <img src={url} css={{ maxWidth: '100%' }} />
          </div>
        ) : null}
      </Modal>
    </React.Fragment>
  );
};
