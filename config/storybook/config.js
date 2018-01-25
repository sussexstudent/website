if (module.hot) {
  module.hot.accept();
}
import '../../src/css/main.css';

import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name:'USSU Storybook',
  url: 'https://github.com/sussexstudent/website',
  addonPanelInRight: true,
});

const req = require.context('../../src/components', true, /\.stories\.tsx?$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);

