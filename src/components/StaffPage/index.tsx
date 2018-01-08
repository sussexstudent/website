import React from 'react';
import StaffList from '~components/StaffList';
import slugify from '~libs/slugify';
import flatStreamToLevels from '~libs/flatStreamToLevels';
import ContentCard from '../ContentCard';
import {CMSDocument, ComponentBlock, ComponentMap} from "../../types/content";

// TODO: this page (an

const components: ComponentMap = {
  heading: ({ value }: { value: string }) => (
    <h1>
      <span className="u-position-anchor" id={slugify(value)} />
      {value}
    </h1>
  ),
  staff_list: StaffList,
};

function getComponent(component: ComponentBlock, data: CMSDocument, key: string) {
  if (!Object.hasOwnProperty.call(components, component.type)) {
    console.warn(
      `[contentAPI] Requested component not found! ${
        component.type
        } is missing.`
    );
    return null;
  }

  return React.createElement(components[component.type], {
    value: component.value,
    document: data,
    key,
  });
}

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
  data: CMSDocument
}

interface IState {
  visibleKey: string | null;
}

class StaffPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      visibleKey: null,
    };
  }

  render() {
    const { data: { body }, data } = this.props;

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
              {_children !== null
                ? _children.map((element: any) =>
                    getComponent(element, data, slugify(element.value.heading))
                  )
                : null}
            </ContentCard>
          ))}
        </div>
      </div>
    );
  }
}

export default StaffPage;
