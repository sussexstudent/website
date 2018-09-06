import React from 'react';
import { ContentBrowserPage } from '~website/containers/content/types';
import { COLORS } from '~libs/style';
import { ContentBrowserItem } from '~website/components/ContentBrowser/ContentBrowserItem';
import styled, { cx } from 'react-emotion';

export const Column = styled('ul')<{ active: boolean }>(({}) => ({
  maxWidth: '300px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  borderLeft: `4px solid ${COLORS.GREY_SPRING}`,
  '&:first-child': {
    borderLeft: 0,
  },
}));

interface ContentBrowserColumnProps {
  pages: ContentBrowserPage[];
  activeSlug: string;
  position: number;
  currentColumn: number;
}

// pos = active = opacity: 1, else 0.6
console.log(Column);
export const ContentBrowserColumn: React.SFC<ContentBrowserColumnProps> = ({
  pages,
  activeSlug,
  position,
  currentColumn,
}) => (
  <Column
    active={position === currentColumn}
    className={cx({ [`m--active`]: position === currentColumn })}
  >
    {pages.map((page) => (
      <ContentBrowserItem
        key={page.path}
        page={page}
        isActive={page.slug === activeSlug}
      />
    ))}

    {pages.length <= 0 && <em>No pages here. Odd.</em>}
  </Column>
);
