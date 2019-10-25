import React from 'react';
import { css } from '@emotion/core';

interface IProps {
  href: string;
  children: any;
  className?: string;
}

export const Button: React.FC<IProps> = ({ href, children, className }) => {
  return (
    <a href={href} className={className} css={css({ display: 'block' })}>
      {children}
    </a>
  );
};
