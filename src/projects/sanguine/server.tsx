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
// import { getBundles } from 'react-loadable/webpack'
// import stats from '../../../sanguine-dist/react-loadable.json';
import { Website } from './Website';

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

    const modules: any[] = [];
    const context = {};
    const App = (
      <StaticRouter location={req.url} context={context}>
        <ApolloProvider client={client}>
          <ReduxProvider store={store}>
            <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
              <Website assets={localAssetsStub as any} loggedIn={false} />
            </Loadable.Capture>
          </ReduxProvider>
        </ApolloProvider>
      </StaticRouter>
    );

    // const bundles = getBundles(stats as any, modules);
    getDataFromTree(App).then(() => {
      const html = ReactDOM.renderToString(
        <StaticRouter location={req.url} context={context}>
          <ApolloProvider client={client}>
            <ReduxProvider store={store}>
              <Website assets={localAssetsStub as any} loggedIn={false} />
            </ReduxProvider>
          </ApolloProvider>
        </StaticRouter>,
      );

      res.send(html);
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
  server({ port: 3003 });

  console.log('/SANGUINE/');
  console.log('/NOW LISTING AT http://localhost:3003/');
});
