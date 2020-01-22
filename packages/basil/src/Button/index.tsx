import React from 'react';
import { css } from '@emotion/core';

interface ButtonProps {
  href: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <a href={href} className={className} css={css({ display: 'block' })}>
      {children}
    </a>
  );
};
