import React, { ReactElement } from 'react';
import blocksMap, { AllBlocks, BlockComponentMap } from './blocksMap';
import { Page } from './types';

interface StreamFieldProps {
  page: any;
  items: AllBlocks[];
  components?: BlockComponentMap;
  renderItem?(props: {
    children: any;
    key: string;
    block: AllBlocks['value'];
    page: Page;
    index: number;
  }): ReactElement | null;
}

const StreamField: React.FC<StreamFieldProps> = ({
  items,
  page,
  renderItem,
  components = {},
}) => {
  const map = { ...blocksMap, ...components };
  return (
    <React.Fragment>
      {items.map((item, index) => {
        const Component = map.hasOwnProperty(item.type) ? map[item.type] : null;

        if (Component) {
          if (renderItem) {
            return renderItem({
              page,
              children: (
                <Component
                  page={page}
                  block={item.value}
                  index={index}
                  key={item.id}
                />
              ),
              block: item.value,
              key: item.id,
              index: index,
            });
          }
          return (
            <Component
              page={page}
              block={item.value}
              index={index}
              key={item.id}
            />
          );
        }

        console.warn(`[content] missing block "${item.type}"`);
        return null;
      })}
    </React.Fragment>
  );
};

export default StreamField;
