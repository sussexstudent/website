import React from 'react';
import { ContentBrowserPage } from '../../pages/content/types';
import { COLORS } from '@ussu/basil/src/style';
import { ContentBrowserItem, itemActive } from './ContentBrowserItem';
import { css } from '@emotion/core';

interface ContentBrowserColumnProps {
  pages: ContentBrowserPage[];
  activeSlug: string;
  position: number;
  currentColumn: number;
}

// pos = active = opacity: 1, else 0.6
export const ContentBrowserColumn: React.FC<ContentBrowserColumnProps> = ({
  pages,
  activeSlug,
  position,
  currentColumn,
}) => (
  <ul
    className={position === currentColumn ? 'm--active' : ''}
    css={css({
      maxWidth: '300px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      borderLeft: `4px solid ${COLORS.GREY_SPRING}`,
      '&:first-child': {
        borderLeft: 0,
      },
      [`.${itemActive}`]: {
        opacity: position === currentColumn ? 1 : 0.6,
      },
    })}
  >
    {pages.map((page) => (
      <ContentBrowserItem
        key={page.path}
        page={page}
        isActive={page.slug === activeSlug}
      />
    ))}

    {pages.length <= 0 && <em>No pages here. Odd.</em>}
  </ul>
);
