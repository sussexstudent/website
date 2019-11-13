import React from 'react';
import { css, jsx } from '@emotion/core';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';

export enum HeadingLevel {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export interface HeadingProps {
  level: HeadingLevel;
  size?: TypeSize;
}

const headingStyle = css({
  marginTop: 0,
});

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  size = TypeSize.GreatPrimer,
}) => {
  return jsx(
    level,
    { css: [headingStyle, css(type(size, Typeface.Secondary))] },
    children,
  );
};
