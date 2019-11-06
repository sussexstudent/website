import React from 'react';
import { css } from '@emotion/core';

interface ContentCardProps {
  anchor?: string;
  bleed?: boolean;
}

const cardStyles = css({
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
  padding: '1rem',
  marginBottom: '1rem',
  backgroundColor: '#ffffff',
});

const bleedStyles = css({
  padding: 0,
  overflow: 'hidden',
});

export const ContentCardContent: React.FC = ({ children }) => (
  <div css={{ padding: '1rem' }}>{children}</div>
);

export const ContentCard: React.FC<ContentCardProps> = ({
  anchor = undefined,
  children,
  bleed = false,
  ...props
}) => (
  <div css={[cardStyles, bleed && bleedStyles]} {...props}>
    {anchor !== undefined ? (
      <span className="u-position-anchor" id={anchor} />
    ) : null}
    {children}
  </div>
);
