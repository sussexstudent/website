import React from 'react';
import { enumValues } from '@ussu/common/src/libs/enumValues';
import { Layout } from '@ussu/common/src/types/slates';
import { SlateLayoutIcon } from './SlateLayoutIcon';
import { css } from '@emotion/core';

interface Props {
  value: Layout;
  layouts: Layout[];
  onChange(layout: Layout): void;
}

// const layoutNameMap = {
//   [Layout.Single]: 'Single',
//   [Layout.TwoHalves]: 'Two Halves',
//   [Layout.TwoThirdsOne]: 'Two Thirds, One Third',
//   [Layout.SplashImpulse]: 'Splash Impulse',
// };

const buttonStyles = css({
  border: 0,
  background: 'transparent',
});

const listStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
});

export const SlateLayoutSelector: React.FC<Props> = ({
  value,
  onChange,
  layouts,
}) => {
  return (
    <ul className={`List List--reset`} css={listStyles}>
      {enumValues(layouts).map((l) => (
        <li key={l}>
          <button css={buttonStyles} onClick={() => onChange(l)}>
            <SlateLayoutIcon layout={l} selected={value === l} />
          </button>
        </li>
      ))}
    </ul>
  );
};
