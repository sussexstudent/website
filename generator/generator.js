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
<link rel="apple-touch-icon" sizes="180x180" href="/stylesheet/union/apple-touch-icon.png">
<link rel="icon" type="image/png" href="/stylesheet/union/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/stylesheet/union/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/stylesheet/union/manifest.json">
<link rel="mask-icon" href="/stylesheet/union/safari-pinned-tab.svg" color="#1db8a4">
<meta name="apple-mobile-web-app-title" content="Students' Union">
<meta name="application-name" content="Students' Union">
<meta name="theme-color" content="#ffffff">
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
