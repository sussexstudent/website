import React from 'react';
import slugify from '@ussu/common/src/libs/slugify';
import flatStreamToLevels from '@ussu/common/src/libs/flatStreamToLevels';
import { ContentCard } from '../../../components/ContentCard';
import StreamField from '../StreamField';
import { Page } from '../types';
import { ContentNavigation } from '../../../components/ContentNavigation';

const fromText = (text: string) => ({ name: text, anchor: slugify(text) });

export function generateTitlesFromStream(list: any[]) {
  // todo
  const headings: (any | null)[] = list.map((block) => {
    switch (block.value.type) {
      case 'heading':
        return {
          ...fromText(block.value.value),
          children: generateTitlesFromStream(block.children),
        };
      case 'staff_list':
        return {
          ...fromText(block.value.value.heading),
          children: generateTitlesFromStream(block.children),
        };
      default:
        return null;
    }
  });

  return headings.filter((item) => item !== null);
}

const levelMap = {
  heading: 0,
  staff_list: 1,
};

interface StaffPageData extends Page {
  body: any;
}

export interface StaffPageProps {
  page: StaffPageData; // todo
}

export const StaffPage: React.FC<StaffPageProps> = ({
  page: { body },
  page,
}) => {
  const levels = flatStreamToLevels(
    (item) => (levelMap as any)[item.type],
    body,
  );

  const menuItems = levels.map((level) => ({
    name: level.value,
    anchor: slugify(level.value),
    children: level._children
      ? level._children.map((l) => ({
          name: l.value.heading,
          anchor: slugify(l.value.heading),
          children: [],
        }))
      : [],
  }));

  return (
    <div className="LokiContainer">
      <div className="Layout Layout--sidebar-left Layout--sidebar-thin">
        <div>
          <aside>
            <ContentNavigation
              title="Contacts"
              items={menuItems}
              activeKey="x"
              onlyShowSubMenuWhenChildActive
            />
          </aside>
        </div>
        <div>
          {levels.map((
            { value, _children = null }: { value: any; _children?: any }, // todo
          ) => (
            <ContentCard anchor={slugify(value)}>
              <h1>{value}</h1>
              {_children !== null ? (
                <StreamField page={page} items={_children} />
              ) : null}
            </ContentCard>
          ))}
        </div>
      </div>
    </div>
  );
};
