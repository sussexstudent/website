import path from 'path';
import React from 'react';
import express from 'express';
import 'isomorphic-fetch';
import jsdom from 'jsdom';
import webpackMiddleware from 'webpack-dev-middleware';
import { render, renderHtml } from './generator/rendering';
import webpack from 'webpack';
import devWebpackConfig from '../webpack.config';
import chokidar from 'chokidar';

const server = express();

const moduleDetectRegEx = /(layout|components).*\.js$/;
chokidar.watch([
  './generator/layouts',
  './generator/components',
])
  .on('change', () => {
    Object.keys(require.cache).forEach((module) => {
      if (moduleDetectRegEx.test(require.cache[module].filename)) {
        console.log(`deleting ${require.cache[module].filename}`);
        delete require.cache[module];
      }
    });
  });

const pages = {
  homepage: () => require('./layouts/homepage').default,
  support: () => require('./layouts/Support').default,
  'homepage-vote': () => require('./layouts/homepage-vote').default,
};

const localAssetsStub = {
  main: {
    js: '/assets/main.js',
    css: '/assets/style.main.css',
  },
  productionFonts: {
    css: '/assets/style.productionFonts.css',
  },
};

function handleTemplaing(html) {
  return new Promise((resolve, reject) => {
    jsdom.env(html, (err, window) => {
      if (err) {
        reject(err);
      }
      const pageContentHTML = window.document.querySelector('main .Container');
      const Main = require('./layouts/main').default;
      resolve(renderHtml((
        <Main assets={localAssetsStub} />
      ), localAssetsStub, { inject: { Content: pageContentHTML ? pageContentHTML.innerHTML : html } }));
    });
  });
}

function clearViewCache() {
  return;
  Object.keys(require.cache).forEach((module) => {
    console.log(require.cache[module].filename);
    /*if (moduleDetectRegEx.test(require.cache[module].filename)) {
      delete require.cache[module];
    */
  });
}

function loadFromLocal(req, res) {
  clearViewCache();
  if (Object.hasOwnProperty.call(pages, req.params.page)) {
    const Main = require('./layouts/main').default;
    const page = renderHtml((
      <Main assets={localAssetsStub} />
    ), localAssetsStub, { inject: { Content: render(pages[req.params.page]()) } });
    res.send(page);
  } else {
    res.status(404);
    res.send('404 ~ Not found.');
  }
}

function loadFromSite(req, res) {
  clearViewCache();
  fetch(`https://www.sussexstudent.com/${req.originalUrl}`)
    .then((response) => {
      const contentType = response.headers.get('Content-Type');
      if (contentType.startsWith('text')) {
        response.text()
          .then((text) => {
            if (contentType.startsWith('text/html')) {
              return handleTemplaing(text);
            }

            return text;
          })
          .then(text => res.send(text));
      } else {
        response.buffer()
          .then(buf => res.send(buf));
      }
    })
    .catch(e => console.log(e));
}


server.use(webpackMiddleware(webpack(devWebpackConfig), {
  publicPath: '/assets/',
}));
server.get('/~/:page', loadFromLocal);
server.get('/*', loadFromSite);


server.listen(3002, () => {
  console.log('Serving on 3002');
});
