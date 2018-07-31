import React from 'react';
import convert from 'htmr';
import { StreamFieldBlock } from '~website/containers/content/types';
import slugify from '~libs/slugify';
import { getTextFromElementChildren } from '~website/containers/content/utils';

export const TextBlock: StreamFieldBlock<string> = ({ block }) => {
  const html = convert(block, {
    transform: {
      h2: (props) => (
        <h2 {...props} id={slugify(getTextFromElementChildren(props.children))}>
          {props.children}
        </h2>
      ),
    },
  });
  return <div className="Prose type-body-copy ContentBlock">{html}</div>;
};
