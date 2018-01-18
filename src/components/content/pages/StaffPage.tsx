import React from 'react';
import slugify from '~libs/slugify';
import flatStreamToLevels from '~libs/flatStreamToLevels';
import ContentCard from '../../ContentCard';
import StreamField from "~components/content/StreamField";
import {Page} from "~components/content/types";

const fromText = (text: string) => ({ name: text, anchor: slugify(text) });

export function generateTitlesFromStream(list: Array<any>) { // todo
  const headings: Array<any | null> = list.map(block => {
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

  return headings.filter(item => item !== null);
}

const levelMap = {
  heading: 0,
  staff_list: 1,
};

interface IProps {
  page: Page<{ body: any }>; // todo
}

interface IState {
  visibleKey: string | null;
}

function getComponent(_a: any, _b: any, _c: any) {
  return null;
}

class StaffPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      visibleKey: null,
    };
  }

  render() {
    const { page: { data: { body } }, page } = this.props;

    const levels = flatStreamToLevels(item => (levelMap as any)[item.type], body);
    return (
      <div className="Layout Layout--sidebar-left Layout--sidebar-thin">
        <div>
          <aside />
        </div>
        <div>
          {levels.map(({ value, _children = null, ...partData }: { value: any, _children?: any }) => ( // todo
            <ContentCard>
              {getComponent(value, (partData as any), slugify(value))}
              {_children !== null ?
                <StreamField page={page} items={_children} />
                : null}
            </ContentCard>
          ))}
        </div>
      </div>
    );
  }
}

export default StaffPage;
