import React from 'react';
import { ContentBrowserPage } from '~website/containers/content/types';
import { ContentBrowserColumn } from '~website/components/ContentBrowser/ContentBrowserColumn';
import styled from '@emotion/styled';

const Root = styled.div({
  display: 'flex',
});

interface ContentBrowserProps {
  pages: ContentBrowserPage;
  segments: string[];
}

export const ContentBrowser: React.FC<ContentBrowserProps> = ({
  segments,
  pages,
}) => {
  const segOne = pages.subPages.find((page) => page.slug === segments[0]);
  const segTwo =
    segOne && segOne.subPages.find((page) => page.slug === segments[1]);

  return (
    <Root>
      {[pages, segOne, segTwo].map(
        (c, index) =>
          c && (
            <ContentBrowserColumn
              pages={c.subPages}
              activeSlug={segments[index]}
              position={index}
              currentColumn={segments.filter((x) => x !== '').length}
            />
          ),
      )}
    </Root>
  );
};
