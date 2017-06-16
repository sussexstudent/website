import React from 'react';
import ContentNavigation from '@ussu/components/ContentNavigation';
import StaffList from '@ussu/components/StaffList';
import slugify from '../../libs/slugify';
import flatStreamToLevels from '../../libs/flatStreamToLevels';
import VisibleChildWatcher from '../VisibleChildWatcher/index';

const components = {
  heading: ({ value }) => (
    <h1>
      <span className="u-position-anchor" id={slugify(value)} />
      {value}
    </h1>
  ),
  staff_list: StaffList,
};

function getComponent(component, data, key) {
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
    return (
      <div className="Layout Layout--sidebar-left Layout--sidebar-thin">
        <div>
          <aside>
            <ContentNavigation
              items={generateTitlesFromStream(levels)}
              activeKey={this.state.visibleKey}
            />
          </aside>
        </div>
        <div>
          <VisibleChildWatcher
            onChange={visibleKey => this.setState({ visibleKey })}
          >
            {body.map(component =>
              getComponent(
                component,
                data,
                component.type === 'heading'
                  ? slugify(component.value)
                  : slugify(component.value.heading)
              )
            )}
          </VisibleChildWatcher>
        </div>
      </div>
    );
  }
}

export default StaffPage;
