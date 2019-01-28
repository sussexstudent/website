import React from 'react';
import { ContentBrowserPage } from '~website/containers/content/types';
import { COLORS } from '~libs/style';
import {
  ContentBrowserItem,
  Item,
  itemActive,
} from '~website/components/ContentBrowser/ContentBrowserItem';
import { cx } from 'emotion';
import styled from '@emotion/styled';

export const Column = styled.ul<{ active: boolean }>(({ active }) => ({
  maxWidth: '300px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  borderLeft: `4px solid ${COLORS.GREY_SPRING}`,
  '&:first-child': {
    borderLeft: 0,
  },
  [`${Item} .${itemActive}`]: {
    opacity: active ? 1 : 0.6,
  },
}));

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
