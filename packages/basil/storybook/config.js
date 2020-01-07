import React from 'react';
import {Storybase} from "@ussu/website/src/components/Storybase";

if (module.hot) {
  module.hot.accept();
}

import { configure, addDecorator } from '@storybook/react';
import '../../common/src/css/main.css';

function Padding(story) {
  return (
    React.createElement('div', { style: { padding: '1rem' }}, story())
  )
}

addDecorator(Storybase());
addDecorator(Padding);

configure(require.context('../src', true, /\.stories\.tsx$/), module);

