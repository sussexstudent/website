import React from 'react';
// import ContentNavigation from '~components/ContentNavigation';
import StaffList from '~components/StaffList';
import slugify from '~libs/slugify';
import flatStreamToLevels from '~libs/flatStreamToLevels';
import ContentCard from '../ContentCard';
// import VisibleChildWatcher from '../VisibleChildWatcher';

const components = {
  heading: ({ value }) =>
    <h1>
      <span className="u-position-anchor" id={slugify(value)} />
      {value}
    </h1>,
  staff_list: StaffList,
};

function getComponent(component, data, key) {
  console.log(component, data);
  if (!Object.hasOwnProperty.call(components, component.type)) {
    console.warn(
      `[contentAPI] Requested component not found! ${component.type} is missing.`
    );
    return null;
  }

  return React.createElement(components[component.type], {
    value: component.value,
    document: data,
    key,
  });
}

const fromText = text => ({ name: text, anchor: slugify(text) });

export function generateTitlesFromStream(list) {
  const headings = list.map(block => {
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

class StaffPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleKey: null,
    };
  }

  render() {
    const { data: { body }, data } = this.props;

    const levels = flatStreamToLevels(item => levelMap[item.type], body);
    console.log(levels);
    return (
      <div className="Layout Layout--sidebar-left Layout--sidebar-thin">
        <div>
          <aside />
        </div>
        <div>
          {levels.map(({ value, _children = null, ...partData }) =>
            <ContentCard>
              {getComponent(value, partData, slugify(value))}
              {_children !== null
                ? _children.map(element =>
                    getComponent(element, data, slugify(element.value.heading))
                  )
                : null}
            </ContentCard>
          )}
        </div>
      </div>
    );
  }
}

export default StaffPage;
