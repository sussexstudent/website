import React from 'react';
import { css, keyframes } from '@emotion/core';

interface SkeletonProps {
  count?: number;
  duration?: number;
  width?: number;
  template?: string;
  height?: number;
  circle?: false;
  fill?: boolean;
}

export const defaultBaseColor = '#eee';

export const defaultHighlightColor = '#f5f5f5';

export const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const skeletonClass = css({
  backgroundColor: defaultBaseColor,
  backgroundImage: `linear-gradient(
    90deg,
    ${defaultBaseColor},
    ${defaultHighlightColor},
    ${defaultBaseColor}
  )`,
  backgroundSize: '200px 100%',
  backgroundRepeat: 'no-repeat',
  display: 'inline-block',
  lineHeight: 1,
  color: 'transparent',
});

const lines = [95, 92, 93, 84, 93, 43, 84, 98, 95, 92, 93, 84, 93, 43, 84, 98];

export const Skeleton: React.FC<SkeletonProps> = ({
  template = '______ ______',
  count = 1,
  duration = 1.2,
  fill,
  width = undefined,
  height = undefined,
  circle = false,
}) => {
  const elements = [];

  for (let i = 0; i < count; i++) {
    let style: any = {
      animation:
        `${skeletonKeyframes} ` + String(duration) + 's ease-in-out infinite',
    };

    if (width !== null) {
      style.width = width;
    }

    if (height !== null) {
      style.height = height;
    }

    if (width !== null && height !== null && circle) {
      style.borderRadius = '50%';
    }

    if (fill) {
      style.position = 'absolute';
      style.top = 0;
      style.left = 0;
      style.bottom = 0;
      style.right = 0;
    }

    elements.push(
      <span
        key={i}
        css={[
          skeletonClass,
          style,
          count > 1 && { width: `${lines[i]}%` },
          i > 0 && { marginTop: 5 },
          { borderRadius: fill ? 0 : 4 },
        ]}
      >
        {template}
      </span>,
    );
  }

  return <span>{elements}</span>;
};
