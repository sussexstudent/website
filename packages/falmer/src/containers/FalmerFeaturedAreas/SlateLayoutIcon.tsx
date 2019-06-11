import React from 'react';
import { Layout } from '@ussu/common/src/types/slates';
import { css, cx } from 'emotion';
import { AreasMap, SlateLayout } from '@ussu/website/src/components/SlateLayout';
import { COLORS } from '@ussu/common/src/libs/style';

const selectedStyles = css({
  opacity: 1,
});

const containerStyles = css({
  width: 48,
  height: 64,
  position: 'relative',
  opacity: 0.4,
});

const pageStyles = css({
  width: 240,
  height: 320,
  background: '#fff',
  boxShadow: `0 10px 12px rgba(60, 60, 60, 0.3)`,
  border: `3px solid ${COLORS.GREY_WINTER}`,
  padding: 20,
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'scale(0.2)',
  transformOrigin: '0 0',
  borderRadius: 12,
  boxSizing: 'border-box',
});

const areaStyles = css({
  borderRadius: 12,
  height: 80,
  flex: 'auto',
});

const colors = [
  COLORS.BRAND_BLUE,
  COLORS.BRAND_RED,
  COLORS.BRAND_GREEN,
  COLORS.BRAND_YELLOW,
  COLORS.BRAND_PINK,
];

export const SlateLayoutIcon: React.FC<{
  layout: Layout;
  selected: boolean;
}> = ({ layout, selected }) => {
  const areas = new Array(AreasMap[layout])
    .fill(null)
    .map((_k, i) => (
      <div
        className={areaStyles}
        style={{ backgroundColor: colors[i % colors.length] }}
        key={i}
      />
    ));

  return (
    <div className={cx(containerStyles, { [selectedStyles]: selected })}>
      <div className={pageStyles}>
        <SlateLayout layout={layout} areas={areas} />
      </div>
    </div>
  );
};
