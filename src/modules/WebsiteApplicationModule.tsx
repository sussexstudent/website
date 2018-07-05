import ReactDOM from 'react-dom';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import HydroRootApollo from '~components/HydroRootApollo';
import HydroRootRouter from '~components/HydroRootRouter';
import WebsiteApplication from '~website/containers/WebsiteApplication';
import { store } from '../projects/website/redux/store';
import { AppMountState } from '../projects/website/ducks/router';

export default function ready(
  container: any,
  appMountState: AppMountState = AppMountState.Initial,
) {
  ReactDOM.render(
    <HydroRootApollo>
      <HydroRootRouter>
        <ReduxProvider store={store}>
          <WebsiteApplication appMountState={appMountState} />
        </ReduxProvider>
      </HydroRootRouter>
    </HydroRootApollo>,
    container,
  );
}
