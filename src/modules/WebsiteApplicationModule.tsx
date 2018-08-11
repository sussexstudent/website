import ReactDOM from 'react-dom';
import React from 'react';
import { Location } from '@reach/router';
import { Provider as ReduxProvider } from 'react-redux';
import HydroRootApollo from '~components/HydroRootApollo';
import WebsiteApplication from '~website/containers/WebsiteApplication';
import { store } from '~website/redux/store';
import { AppMountState } from '~website/ducks/router';

export default function ready(
  container: any,
  appMountState: AppMountState = AppMountState.Initial,
) {
  ReactDOM.render(
    <HydroRootApollo>
      <ReduxProvider store={store}>
        <Location>
          {({ location, navigate }) => (
            <WebsiteApplication
              appMountState={appMountState}
              navigate={navigate}
              location={location}
            />
          )}
        </Location>
      </ReduxProvider>
    </HydroRootApollo>,
    container,
  );
}
