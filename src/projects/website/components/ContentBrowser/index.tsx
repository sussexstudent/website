import React from 'react';
import cx from 'classnames';
import { ContentBrowserPage } from '~website/containers/content/types';
import { InternalAppLink } from '~components/InternalAppLink';

interface ContentBrowserProps {
  pages: ContentBrowserPage;
  segments: string[];
}

interface ContentBrowserState {}

const PageItem: React.SFC<{ page: ContentBrowserPage; isActive: boolean }> = ({
  page: { path, contentType, title },
  isActive,
}) => (
  <li
    className={cx('ContentBrowser__item', {
      'ContentBrowser__item--active': isActive,
    })}
  >
    <InternalAppLink
      className="ContentBrowser__page-link"
      to={contentType === 'StubPage' ? `/browse${path}` : path}
    >
      <div className="ContentBrowser__page-title">{title}</div>
      <div className="ContentBrowser__page-description" />
    </InternalAppLink>
  </li>
);

export class ContentBrowser extends React.Component<
  ContentBrowserProps,
  ContentBrowserState
> {
  render() {
    const { segments, pages } = this.props;
    const segOne = pages.subPages.find((page) => page.slug === segments[0]);
    const segTwo =
      segOne && segOne.subPages.find((page) => page.slug === segments[1]);

    return (
      <div
        className={cx('ContentBrowser', {
          'ContentBrowser--has-two': !!segOne,
          'ContentBrowser--has-three': !!segTwo,
        })}
      >
        <ul className="ContentBrowser__column ContentBrowser__column--one">
          {pages.subPages.map((page) => (
            <PageItem
              key={page.path}
              page={page}
              isActive={page.slug === segments[0]}
            />
          ))}
        </ul>
        {segOne && (
          <ul className="ContentBrowser__column ContentBrowser__column--two">
            {segOne.subPages.map((page) => (
              <PageItem
                key={page.path}
                page={page}
                isActive={page.slug === segments[1]}
              />
            ))}
            {segOne.subPages.length <= 0 && <em>No pages here. Odd.</em>}
          </ul>
        )}

        {segTwo && (
          <ul className="ContentBrowser__column ContentBrowser__column--three">
            {segTwo.subPages.map((page) => (
              <PageItem
                key={page.path}
                page={page}
                isActive={page.slug === segments[2]}
              />
            ))}
            {segTwo.subPages.length <= 0 && <em>No pages here. Odd.</em>}
          </ul>
        )}
      </div>
    );
  }
}
