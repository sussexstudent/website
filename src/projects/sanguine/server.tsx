import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import fetch from 'node-fetch';
import { ServerLocation } from '@reach/router';
import WebsiteApplication from "../website/containers/WebsiteApplication";
import {AppMountState} from "~website/ducks/router";
import {ApolloProvider, getDataFromTree} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import {createSanguineStore} from '~website/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import Loadable from 'react-loadable';
import introspectionQueryResultData from '../../../fragmentTypes.json';
import { getBundles } from 'react-loadable/webpack'
import stats from '../../../sanguine-dist/react-loadable.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData as any,
});

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
    const App = (
      <ServerLocation url={req.path}>
          <ApolloProvider client={client}>
            <ReduxProvider store={store}>
              <Loadable.Capture report={moduleName => modules.push(moduleName)}>
               <WebsiteApplication appMountState={AppMountState.Initial} />
              </Loadable.Capture>
            </ReduxProvider>
          </ApolloProvider>
      </ServerLocation>
    );

    const bundles = getBundles(stats as any, modules);
    getDataFromTree(App).then(() => {
      const html = ReactDOM.renderToString((
        <ServerLocation url={req.url}>
          <ApolloProvider client={client}>
            <ReduxProvider store={store}>
              <WebsiteApplication appMountState={AppMountState.Initial} />
            </ReduxProvider>
          </ApolloProvider>
        </ServerLocation>
      ));

      console.log({bundles, modules, path: req.path});
      res.send(html);
    });
  }

  app.use(handleRender);


  app.listen(port);
}

Loadable.preloadAll().then(() => {
  server({port: 3003});

  console.log('/SANGUINE/');
  console.log('/NOW LISTING AT http://localhost:3003/');
});
