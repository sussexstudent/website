import React from 'react';
import { enumValues } from '~libs/enumValues';
import { Layout } from '~types/slates';
import { SlateLayoutIcon } from '~falmer/containers/FalmerFeaturedAreas/SlateLayoutIcon';
import { css } from 'emotion';

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
    <ul className={`List List--reset ${listStyles}`}>
      {enumValues(layouts).map((l) => (
        <li key={l}>
          <button className={buttonStyles} onClick={() => onChange(l)}>
            <SlateLayoutIcon layout={l} selected={value === l} />
          </button>
        </li>
      ))}
    </ul>
  );
};
