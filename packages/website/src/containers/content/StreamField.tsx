import React, { ReactElement } from 'react';
import blocksMap from '../content/blocksMap';
import { Page, StreamFieldBlock } from './types';

interface StreamFieldProps {
  page: any;
  items: any[];
  renderItem?(props: {
    children: any;
    key: string;
    block: StreamFieldBlock<any>;
    page: Page;
    index: number;
  }): ReactElement | null;
}

const StreamField: React.FC<StreamFieldProps> = ({ items, page, renderItem }) => {
  return (
    <React.Fragment>
      {items.map((item, index) => {
        const Component = blocksMap.hasOwnProperty(item.type)
          ? blocksMap[item.type]
          : null;

        if (Component) {
          if (renderItem) {
            return renderItem({
              page,
              children: (
                <Component page={page} block={item.value} index={index} key={item.id} />
              ),
              block: item.value,
              key: item.id,
              index: index
            });
          }
          return <Component page={page} block={item.value} index={index} key={item.id} />;
        }

        console.warn(`[content] missing block "${item.type}"`);
        return null;
      })}
    </React.Fragment>
  );
};

export default StreamField;
