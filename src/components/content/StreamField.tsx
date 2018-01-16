import React from 'react';
import blocksMap from "~components/content/blocksMap";

interface IProps {
  page: any;
  items: Array<any>
}

class StreamField extends React.Component<IProps> {
  render() {
    const {
      items, page
    } = this.props;
    return items.map(item => {
      const Component = blocksMap.hasOwnProperty(item.type) ? blocksMap[item.type] : null;

      if (Component) {
        return <Component page={page} block={item.value} key={item.key} />
      }

      console.warn(`[content] missing block "${item.type}"`);
      return null;
    });
  }
}

export default StreamField;
