import React, { ReactElement } from 'react';
import blocksMap from '~website/containers/content/blocksMap';
import { Page, StreamFieldBlock } from '~website/containers/content/types';

interface IProps {
  page: any;
  items: any[];
  renderItem?(props: {
    children: any;
    key: string;
    block: StreamFieldBlock<any>;
    page: Page;
  }): ReactElement | null;
}

const StreamField: React.FC<IProps> = ({ items, page, renderItem }) => {
  return (
    <React.Fragment>
      {items.map((item) => {
        const Component = blocksMap.hasOwnProperty(item.type)
          ? blocksMap[item.type]
          : null;

        if (Component) {
          if (renderItem) {
            return renderItem({
              page,
              children: (
                <Component page={page} block={item.value} key={item.id} />
              ),
              block: item.value,
              key: item.id,
            });
          }

          return <Component page={page} block={item.value} key={item.id} />;
        }

        console.warn(`[content] missing block "${item.type}"`);
        return null;
      })}
    </React.Fragment>
  );
};

export default StreamField;
