import React from 'react';
import blocksMap from '~components/content/blocksMap';
import { Page, StreamFieldBlock } from '~components/content/types';

interface IProps {
  page: any;
  items: any[];
  renderItem?(props: {
    children: any;
    key: string;
    block: StreamFieldBlock<any>;
    page: Page<any>;
  }): any;
}

class StreamField extends React.Component<IProps> {
  render() {
    const { items, page, renderItem } = this.props;
    return items.map((item) => {
      const Component = blocksMap.hasOwnProperty(item.type)
        ? blocksMap[item.type]
        : null;

      if (Component) {
        if (renderItem) {
          return renderItem({
            page,
            children: (
              <Component page={page} block={item.value} key={item.key} />
            ),
            block: item.value,
            key: item.key,
          });
        }

        return <Component page={page} block={item.value} key={item.key} />;
      }

      console.warn(`[content] missing block "${item.type}"`);
      return null;
    });
  }
}

export default StreamField;
