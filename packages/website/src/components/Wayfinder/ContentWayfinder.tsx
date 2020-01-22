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
  subPagesWayfinding: WayfinderPage[];
  subPages: WayfinderPage[];
  ancestorPagesGeneric: WayfinderPage[];
}

export interface WayfinderProps {
  page: WayfinderPage;
}

const contentTypeBlacklist = ['KBRootPage', 'FreshersHomepage'];

const inBlacklist = (page: WayfinderPage): boolean =>
  contentTypeBlacklist.includes(page.contentType);
const isUsable = (page: WayfinderPage) =>
  (page !== undefined && !inBlacklist(page) && page) || null;

const getWayfinderDataFromPage = (page: WayfinderPage) => {
  const { ancestorPagesGeneric } = page;
  const pages = [
    ...ancestorPagesGeneric,
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
        {section.subPagesWayfinding
          ? section.subPagesWayfinding.map((subPage) => {
              return (
                <WayfinderItem key={subPage.path} to={subPage.path}>
                  {subPage.title}
                </WayfinderItem>
              );
            })
          : null}
      </WayfinderTopLevel>
      {topic?.subPagesWayfinding && topic.subPagesWayfinding.length > 0 ? (
        <WayfinderSecondLevel title={topic.title} to={topic.path}>
          {topic.subPagesWayfinding.map((subPage) => {
            return (
              <WayfinderItem key={subPage.path} to={subPage.path}>
                {subPage.title}
              </WayfinderItem>
            );
          })}
        </WayfinderSecondLevel>
      ) : null}

      {subnav?.subPagesWayfinding && subnav.subPagesWayfinding.length > 0 ? (
        <WayfinderThirdLevel title={subnav.title} to={subnav.path}>
          {subnav.subPagesWayfinding.map((subPage) => (
            <WayfinderItem key={subPage.path} to={subPage.path}>
              {subPage.title}
            </WayfinderItem>
          ))}
        </WayfinderThirdLevel>
      ) : null}
    </Wayfinder>
  );
};
