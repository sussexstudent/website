import React from 'react';
import { SlateBox } from '@ussu/common/src/types/slates';

interface SlateBoxImpulseButtonProps {
  text: string;
  link: string;
  color: 'blue' | 'red' | 'green' | 'yellow';
}

const SlateBoxImpulseButtonComponent: React.FC<SlateBoxImpulseButtonProps> = (
  props,
) => (
  <a
    className={`type-great-primer BentoBox BentoBox--anchor BentoBox--impulse BentoBox--color-${props.color}`}
    href={props.link}
  >
    {props.text}
  </a>
);

const schema = {
  type: 'object',
  required: ['title', 'link'],
  properties: {
    text: { type: 'string', title: 'Text', default: 'A new task' },
    link: { type: 'string', title: 'link', default: '' },
    color: { type: 'string', title: 'Color', default: 'blue' },
  },
};

export const SlateBoxImpulseButton: SlateBox = {
  schema,
  uiSchema: {},
  component: SlateBoxImpulseButtonComponent,
  displayName: 'ImpulseButton',
  category: 'button',
};
