import React from 'react';
import convert from 'htmr';
import { StreamFieldBlock, StreamFieldBlockData } from '../types';
import slugify from '@ussu/common/src/libs/slugify';
import { getTextFromElementChildren } from '../utils';

export type TextBlockData = StreamFieldBlockData<
  'paragraph' | 'text',
  {
    value: string;
  }
>;

export const TextBlock: StreamFieldBlock<TextBlockData> = ({ block }) => {
  const html = convert(block.value, {
    transform: {
      h2: (props) =>
        props.children === null ? null : (
          <h2
            {...props}
            id={slugify(getTextFromElementChildren(props.children))}
          >
            {props.children}
          </h2>
        ),
      p: (props) => (props.children === null ? null : <p>{props.children}</p>),
    },
  });
  return <div className="Prose ContentBlock">{html}</div>;
};
