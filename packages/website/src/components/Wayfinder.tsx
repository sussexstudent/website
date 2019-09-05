import React from 'react';
import { COLORS } from '@ussu/common/src/libs/style';
import { Link } from 'react-router-dom';

interface WayfinderPage {
  title: string;
  path: string;
  contentType: string;
  ancestorPages: WayfinderPage[];
  subPages: WayfinderPage[];
}

export interface WayfinderProps {
  page: WayfinderPage;
}

const contentTypeBlacklist = ['KBRootPage', 'FreshersHomepage'];

const inBlacklist = (page: WayfinderPage) =>
  contentTypeBlacklist.indexOf(page.contentType) > -1;
const isUsable = (page: WayfinderPage) =>
  (page !== undefined && !inBlacklist(page) && page) || null;

const getWayfinderDataFromPage = (page: WayfinderPage) => {
  const { ancestorPages } = page;
  const pages = [...ancestorPages, page];

  const section = isUsable(pages[2]);
  const topic = isUsable(pages[3]);
  const subnav = isUsable(pages[4]);

  return {
    section: section,
    topic: (section && topic) || null,
    subnav: (section && topic && subnav) || null,
  };
};

const Menu: React.FC<React.HTMLProps<HTMLUListElement>> = ({
  children,
  ...props
}) => {
  return (
    <ul
      css={{
        padding: 0,
        margin: 0,
        listStyle: 'none',
        display: 'inline',
      }}
      {...props}
    >
      {children}
    </ul>
  );
};

export const Wayfinder: React.FC<WayfinderProps> = ({ page }) => {
  const { section, topic, subnav } = getWayfinderDataFromPage(page);

  if (!section) {
    return null;
  }

  return (
    <div css={{ marginTop: '-1rem', marginBottom: '1rem' }}>
      <div
        css={{
          background: COLORS.GREY_SUMMER,
          fontSize: '1.1em',
        }}
      >
        <div className="LokiContainer">
          <Link
            css={{
              display: 'inline',
              fontWeight: 600,
              paddingRight: '1rem',
              color: COLORS.GREY_SAD_SLATE,
              textDecoration: 'none',
            }}
            to={section.path}
          >
            {section.title}
          </Link>
          <Menu>
            {section.subPages.map((subPage) => (
              <li css={{ display: 'inline' }}>
                <Link
                  css={[
                    {
                      display: 'inline-block',
                      padding: '0.4rem 0.8rem',
                      fontWeight: 500,
                      color: COLORS.GREY_SLATE,
                      textDecoration: 'none',
                    },
                    page.path.startsWith(subPage.path) && [
                      { color: '#fff', background: COLORS.BRAND_BLUE },
                    ],
                  ]}
                  to={subPage.path}
                >
                  {subPage.title}
                </Link>
              </li>
            ))}
          </Menu>
        </div>
      </div>
      {topic && topic.subPages.length > 0 ? (
        <div
          css={{
            background: COLORS.BRAND_BLUE,
            color: '#fff',
            fontWeight: 600,
            padding: '0.2rem 0',
          }}
        >
          <div className="LokiContainer">
            <Link
              css={{
                display: 'inline',
                paddingRight: '1rem',
                color: '#fff',
                textDecoration: 'none',
              }}
              to={topic.path}
            >
              {topic.title} ›
            </Link>
            <Menu>
              {topic.subPages.map((subPage) => (
                <li css={{ display: 'inline' }}>
                  <Link
                    css={[
                      {
                        padding: '0 0.4rem',
                        textDecoration: 'none',
                        color: '#fff',
                      },
                      page.path.startsWith(subPage.path) && [
                        { borderBottom: '2px solid #fff' },
                      ],
                    ]}
                    to={subPage.path}
                  >
                    {subPage.title}
                  </Link>
                </li>
              ))}
            </Menu>
          </div>
        </div>
      ) : null}
      {subnav && subnav.subPages.length > 0 ? (
        <div
          css={{
            color: COLORS.GREY_SLATE,
            fontWeight: 500,
            padding: '0.2rem 0',
          }}
        >
          <div className="LokiContainer">
            <Link
              css={{
                display: 'inline',
                paddingRight: '1rem',
                textDecoration: 'none',
                color: COLORS.GREY_SLATE,
              }}
              to={subnav.path}
            >
              {subnav.title} ›
            </Link>
            <Menu>
              {subnav.subPages.map((subPage) => (
                <li css={{ display: 'inline' }}>
                  <Link
                    css={{
                      padding: '0 0.4rem',
                      textDecoration: 'none',
                      color: COLORS.GREY_WORST_WINTER,
                    }}
                    to={subPage.path}
                  >
                    {subPage.title}
                  </Link>
                </li>
              ))}
            </Menu>
          </div>
        </div>
      ) : null}
    </div>
  );
};
