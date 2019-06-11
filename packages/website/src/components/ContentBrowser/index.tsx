import React from 'react';
import { ContentBrowserPage } from '../../containers/content/types';
import { ContentBrowserColumn } from './ContentBrowserColumn';

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
    <div css={{
      display: 'flex',
    }}>
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
    </div>
  );
};
