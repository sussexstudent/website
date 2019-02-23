import React from 'react';
import { SlateBox } from '~types/slates';

interface IProps {}

const component: React.FC<IProps> = () => <div>select a box</div>;

const schema = {};

export const SlateBoxEmpty: SlateBox = {
  component,
  schema,
  uiSchema: {},
  displayName: 'Empty',
  category: 'button',
};
