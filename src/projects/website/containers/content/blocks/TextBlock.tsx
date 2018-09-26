import React from 'react';
import convert from 'htmr';
import { StreamFieldBlock } from '~website/containers/content/types';
import slugify from '~libs/slugify';
import { getTextFromElementChildren } from '~website/containers/content/utils';

export const TextBlock: StreamFieldBlock<{ value: string }> = ({ block }) => {
  const html = convert(block.value, {
    transform: {
      h2: (props) => props.children === null ? null : (
        <h2 {...props} id={slugify(getTextFromElementChildren(props.children))}>
          {props.children}
        </h2>
      ),
      p: (props) => props.children === null ? null : <p>{props.children}</p>
    },
  });
  return <div className="Prose type-body-copy ContentBlock">{html}</div>;
};
