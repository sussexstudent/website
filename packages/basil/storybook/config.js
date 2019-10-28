//import unionTheme from "./unionTheme";
import { create } from '@storybook/theming';

if (module.hot) {
  module.hot.accept();
}

import { configure, addParameters } from '@storybook/react';
import '../../common/src/css/main.css';

//addParameters({
 // options: { theme: unionTheme}
//});

const req = require.context('../src', true, /\.stories\.tsx?$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
