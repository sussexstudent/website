import React from 'react';
import express from 'express';
import 'isomorphic-fetch';
import jsdom from 'jsdom';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import chokidar from 'chokidar';
import webpackHotMiddleware from 'webpack-hot-middleware';
import devWebpackConfig from '../webpack.config';
import { render, renderHtml } from './generator/rendering';

const server = express();


global.mslInject = {
  jsonuserinfo: `<script type="type/javascript">

//<![CDATA[
var mslUserInfo =
{"userinfo": {
  "FirstName": "Rose",
  "LastName": "Person",
  "UniqueId": "fdf26sd8-90a1-43g2-af0d-d945c5d441a0",
  "DataParameters": null
}}//]]>
  </script>`,
  Admin: `<div class="mslwidget">
<div id="msl_admin" class="msl_admin_menu">

    <h3>
	Admin
    </h3>



    <ul id="ulAdmin">
            <li><a href="/admin/adverts/" class="msl_admin">Adverts Admin</a></li>

            <li><a href="/admin/blogs/" class="msl_admin">Blog Admin</a></li>

            <li><a href="/admin/directory/" class="msl_admin">Directory Admin</a></li>

            <li><a href="/admin/elections/" class="msl_admin">Elections Admin</a></li>

            <li><a href="/admin/ents/" class="msl_admin">Events Admin</a></li>

            <li><a href="/admin/forums/" class="msl_admin">Forum Admin</a></li>

            <li><a href="/admin/ideas/" class="msl_admin">Ideas Admin</a></li>

            <li><a href="/admin/jobs/" class="msl_admin">Jobs Admin</a></li>

            <li><a href="/admin/livefeed/" class="msl_admin">LiveFeed Admin</a></li>

            <li><a href="/admin/marketplace/" class="msl_admin">Marketplace Admin</a></li>

            <li><a href="/admin/messaging/" class="msl_admin">Messaging Admin</a></li>

            <li><a href="/admin/news/" class="msl_admin">News Admin</a></li>

            <li><a href="/admin/poll/" class="msl_admin">Poll Admin</a></li>

            <li><a href="/admin/profile/" class="msl_admin">Profile Admin</a></li>

            <li><a href="/admin/referenda/" class="msl_admin">Referenda Admin</a></li>

            <li><a href="/admin/shop/" class="msl_admin">Shop Admin</a></li>

            <li><a href="/admin/surveys/" class="msl_admin">Survey Admin</a></li>

            <li><a href="/admin/surveyadmin/" class="msl_admin">Survey Admin (All surveys)</a></li>

            <li><a href="/admin/volunteering/" class="msl_admin">Volunteering Admin</a></li>

            <li><a href="/admin/portal/" class="msl_admin">Website Admin</a></li>
        </ul>

	<div id="ctl00_AdminPanel_pnlOrganisations">

        <h4>
	    <a id="ctl00_AdminPanel_lbOrganisations" href="javascript:__doPostBack('ctl00$AdminPanel$lbOrganisations','')">Organisations</a>
        </h4>

        <ul id="ulOrgs">
                <li><a href="/organisation/admin/6312/" class="msl_admin">Comedy</a></li>

                <li><a href="/organisation/admin/0/" class="msl_admin">MSL Membership System</a></li>
            </ul>

</div>

</div>
</div>`,
  ControlPanel: `<div id="controlpanel" class="sidepanel">
	<h3>Control Panel</h3>
	<ul id="ctl00_controlpanel_ulControlPanel"><li id="ctl00_controlpanel_organisationadminnews0" class="msl_edit"><a href="/organisation/admin/news/0/">Edit MSL Membership System News</a></li><li id="ctl00_controlpanel_editpagepagename" class="msl_edit"><a href="/edit/page/?page_name=/">Edit Page</a></li><li id="ctl00_controlpanel_editpagesnewpageparent" class="msl_add"><a href="/edit/pages/newpage/?parent=/">Add child page</a></li><li id="ctl00_controlpanel_adminents" class="msl_edit"><a href="/admin/ents/">Edit MSL Membership System events</a></li></ul>
</div>`,
};



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
  'environment/feedback': () => require('./layouts/environment/student-feedback').default,
  homepage: () => require('./layouts/homepage').default,
  'get-involved': () => require('./layouts/getinvolved').default,
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
  vendor: {
    js: '/assets/vendor.js',
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
      <Main assets={localAssetsStub} loggedIn={Object.hasOwnProperty.call(req.query, 'auth')} />
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

const compiler = webpack(devWebpackConfig);
server.use(webpackMiddleware(compiler, {
  publicPath: '/assets/',
}));

server.use(webpackHotMiddleware(compiler));

server.get('/~/:page(*)', loadFromLocal);
server.get('/*', loadFromSite);


server.listen(3002, () => {
  console.log('Serving on 3002');
});
