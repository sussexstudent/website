import React from 'react';
import ReactDOM from 'react-dom/server';
import throttle from 'lodash/throttle';
import MainLayout from './layouts/main';
import GetInvolvedLayout from './layouts/getinvolved';
import Homepage from './layouts/homepage';
import assets from '../webpack-assets.json';
import ncp from 'copy-paste';

const render = (element) => {
  return ReactDOM.renderToStaticMarkup(element);
};

const headContent = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="${assets.productionFonts.css}" rel="stylesheet" />
<link href="${assets.main.css}" rel="stylesheet" />
<MSL:JsonUserInfo />
`;

const partials = {
  'Legacy: <head> Content': headContent,
  'Legacy: Public Template': render(<MainLayout assets={assets} legacy />),
  'Legacy: Logged In User Template': render(<MainLayout assets={assets} legacy loggedIn />),
  'Main: <head> Content': headContent,
  'Main: Public Template': render(<MainLayout assets={assets} />),
  'Main: Logged In User Template': render(<MainLayout assets={assets} loggedIn />),
  'Homepage!:': render(<Homepage />),
  '/get-involved': render(<GetInvolvedLayout />),
};
/*
Object.keys(partials).forEach((key) => {
  console.log(`\n//////////START OF: ${key}////////////`);
  console.log(partials[key]);
  console.log(`////////////END OF: ${key}////////////\n\n`);
});
*/

const stdin = process.openStdin();

const partialKeys = Object.keys(partials);
let i = 0;

function next() {
  if (i > partialKeys.length - 1) {
    process.exit(0);
  }

  const partialKey = partialKeys[i];
  ncp.copy(partials[partialKey], () => {
    console.log(`${partialKey} now ready to paste. Press enter to continue.`);
  });

  i += 1;
}

stdin.addListener('data', throttle(next, 500));

console.log('Press enter to start.');
