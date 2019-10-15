import React from 'react';
import {
  WayfinderItem,
  WayfinderTopLevel,
  Wayfinder,
  WayfinderSecondLevel,
  WayfinderThirdLevel,
} from './Wayfinder';

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
  const pages = [
    ...ancestorPages,
    { ...page, subPages: (page as any).subPagesWayfinding },
  ];

  const section = isUsable(pages[2]);
  const topic = isUsable(pages[3]);
  const subnav = isUsable(pages[4]);

  return {
    section: section,
    topic: (section && topic) || null,
    subnav: (section && topic && subnav) || null,
  };
};

export const ContentWayfinder: React.FC<WayfinderProps> = ({ page }) => {
  const { section, topic, subnav } = getWayfinderDataFromPage(page);

  if (!section || section.title === 'Homepage') {
    return null;
  }

  return (
    <Wayfinder>
      <WayfinderTopLevel title={section.title} to={section.path}>
        {section.subPages.map((subPage) => {
          return (
            <WayfinderItem key={subPage.path} to={subPage.path}>
              {subPage.title}
            </WayfinderItem>
          );
        })}
      </WayfinderTopLevel>
      {topic && topic.subPages.length > 0 ? (
        <WayfinderSecondLevel title={topic.title} to={topic.path}>
          {topic.subPages.map((subPage) => {
            return (
              <WayfinderItem key={subPage.path} to={subPage.path}>
                {subPage.title}
              </WayfinderItem>
            );
          })}
        </WayfinderSecondLevel>
      ) : null}

      {subnav && subnav.subPages.length > 0 ? (
        <WayfinderThirdLevel title={subnav.title} to={subnav.path}>
          {subnav.subPages.map((subPage) => (
            <WayfinderItem key={subPage.path} to={subPage.path}>
              {subPage.title}
            </WayfinderItem>
          ))}
        </WayfinderThirdLevel>
      ) : null}
    </Wayfinder>
  );
};
