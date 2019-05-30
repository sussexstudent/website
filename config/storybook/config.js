import unionTheme from "./unionTheme";

if (module.hot) {
  module.hot.accept();
}
import '../../src/css/main.css';

import { configure, addParameters } from '@storybook/react';

addParameters({
  options: { theme: unionTheme}
});

const req = require.context('../../src/components', true, /\.stories\.tsx?$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

console.log(req);

configure(loadStories, module);

