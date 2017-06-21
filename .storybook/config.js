import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import '../src/css/main.css';

setAddon(infoAddon);

const req = require.context('../src/js', true, /.stories.js$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
