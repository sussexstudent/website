import ReactDOM from 'react-dom';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import HydroRootApollo from '~components/HydroRootApollo';
import HydroRootRouter from '~components/HydroRootRouter';
import WebsiteApplication from '~components/WebsiteApplication';
import { store } from '../projects/website/redux/store';

export default function ready(container: any) {
  ReactDOM.render(
    <HydroRootApollo>
      <HydroRootRouter>
        <ReduxProvider store={store}>
          <WebsiteApplication />
        </ReduxProvider>
      </HydroRootRouter>
    </HydroRootApollo>,
    container,
  );
}
