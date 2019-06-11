import React from 'react';
import { SlateBox } from '@ussu/common/src/types/slates';

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
