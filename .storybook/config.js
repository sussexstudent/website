import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import '../src/css/main.css';

setAddon(infoAddon);
function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
