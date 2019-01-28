import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import fetch from 'node-fetch';
import { StaticRouter } from 'react-router';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { createSanguineStore } from '~website/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import Loadable from 'react-loadable';
import proxy from 'http-proxy-middleware';
import introspectionQueryResultData from '../../../fragmentTypes.json';
import { getBundles, Bundle } from 'react-loadable/webpack';
import stats from '../../../sanguine-dist/react-loadable-dev.json';
import { Website } from './Website';
import { extractCritical } from 'emotion-server';
import { Branding, manifestHandler } from '~website/head';
import Helmet, { HelmetData } from 'react-helmet';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData as any,
});

const localAssetsStub = {
  map: new Proxy(
    {},
    {
      get(_target, name) {
        return new Proxy(
          {},
          {
            get(_atTarget, atName) {
              if (atName === 'js') {
                return `/assets/${name as string}.js`;
              }

              if (atName === 'css') {
                return `/assets/style.${name as string}.css`;
              }
            },
          },
        );
      },
    },
  ),
};

const ga = `!function(u,s,S,U){u.GoogleAnalyticsObject=S;u[S]||(u[S]=function(){
(u[S].q=u[S].q||[]).push(arguments)});u[S].l=+new Date;U=s.createElement('script');
var e=s.scripts[0];U.src='//www.google-analytics.com/analytics.js';
e.parentNode.insertBefore(U,e)}(window,document,'ga');

ga('create', 'UA-258929-3', 'auto');
ga('send', 'pageview');`;

const createBundleTag = ({ publicPath }: Bundle) => <script src={publicPath} />;

function createBaseHtml(
  assets: any,
  helmet: HelmetData,
  apolloExtract: any,
  css: string,
  ids: string[],
  bundles: Bundle[],
  body: string,
) {
  const markup = (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="dns-prefetch" href="//falmer.sussexstudent.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <Branding />
        {assets.manifest && (
          <link href="${assets.map.main.css}" rel="stylesheet" />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `${manifestHandler(assets)}
                window.releaseMetadata = {gitRev: "${assets.gitRev || 'dev'}"};
                try {
                if (JSON.parse(localStorage.getItem('blocking')).enabled) {
                var css = '.AdvertBar { display: none; }';
                var style = document.createElement('style');
                style.type = 'text/css';
                if (style.styleSheet){
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }
                document.head.appendChild(style);
              }
              } catch (e) {}`,
          }}
        />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <div className="Body" id="top">
          <div className="Site" dangerouslySetInnerHTML={{ __html: body }} />
          <div className="js__modal" />
          <div className="js-side-menu" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
      window.__APOLLO_STATE__=${JSON.stringify(apolloExtract).replace(
        /</g,
        '\\\\\u003c',
      )};
        window.emotionIds = ${JSON.stringify(ids)};`,
            }}
          />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0&features=es6,es7,default-3.6,performance.now,Object.entries,Object.values&flags=gated&callback=hasPolyfilled&unknown=polyfill" />
          {bundles.map(createBundleTag)}
          {assets.map.main &&
            assets.map.vendor.js && <script src={assets.map.vendor.js} />}
          {assets.map.main &&
            assets.map.main.js && <script src={assets.map.main.js} />}
          <script dangerouslySetInnerHTML={{ __html: ga }} />
        </div>
      </body>
    </html>
  );

  return `<!doctype html>${ReactDOM.renderToString(markup)}`;
}

export default function server({ port }: { port: number }) {
  const app = express();

  function handleRender(req: express.Request, res: express.Response) {
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: 'https://falmer.sussexstudent.com/graphql/',
        credentials: 'same-origin',
        fetch: fetch as any,
      }),
      cache: new InMemoryCache({ fragmentMatcher }),
    });

    const store = createSanguineStore();

    const context = {};
    const App = (
      <StaticRouter location={req.url} context={context}>
        <ApolloProvider client={client}>
          <ReduxProvider store={store}>
            <Website assets={localAssetsStub as any} loggedIn={false} />
          </ReduxProvider>
        </ApolloProvider>
      </StaticRouter>
    );

    getDataFromTree(App).then(() => {
      const modules: any[] = [];

      const finalMarkup = ReactDOM.renderToString(
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
          <StaticRouter location={req.url} context={context}>
            <ApolloProvider client={client}>
              <ReduxProvider store={store}>
                <Website assets={localAssetsStub as any} loggedIn={false} />
              </ReduxProvider>
            </ApolloProvider>
          </StaticRouter>
        </Loadable.Capture>,
      );
      const { html, css, ids } = extractCritical(finalMarkup);
      const bundles = getBundles(stats as any, modules);
      console.log(bundles, modules);

      const helmet = Helmet.renderStatic();
      const apolloExtract = client.extract();
      console.log(bundles);
      res.send(
        createBaseHtml(
          localAssetsStub,
          helmet,
          apolloExtract,
          css,
          ids,
          bundles as Bundle[],
          html,
        ),
      );
    });
  }

  app.use(
    '/assets',
    proxy({
      target: 'http://localhost:8080',
    }),
  );

  app.use(handleRender);

  app.listen(port);
}

Loadable.preloadAll().then(() => {
  const port = (process.env.PORT as number | undefined) || 3003;
  server({ port });

  console.log('/SANGUINE/');
  console.log('/NOW LISTING AT http://localhost:3003/');
});
