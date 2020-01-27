import React, { useEffect } from 'react';
import { BookMarketApplication } from '../bookmarket/BookMarketApp';
import { WhatsOn } from '../whatson';
import * as routerActions from '../../ducks/router';
import { AppMountState } from '../../ducks/router';
import { ContentPage } from '../content/ContentPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '../../components/ErrorBoundary';
import { RouterAnalytics } from '../../components/RouterAnalytics';
import { FourOhFourPage } from '../content/FourOhFourPage';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from 'react-router';
import { ScrollToTop } from '../../components/ScrollToTop';
import { useDispatch } from 'redux-react-hook';
import { SearchProps } from '../../components/SearchApp';
import loadable from '@loadable/component';
import Homepage from '../homepage';
import { ConsentCodeProps } from '../forms/consent';

interface WebsiteApplicationProps extends RouteComponentProps {
  appMountState: AppMountState;
}

const ContentAPI: React.FC<RouteComponentProps> = (props) => (
  <ContentPage path={props.location.pathname} history={props.history} />
);

const LoadableSearchApp = loadable<SearchProps>(async () => {
  const { Search } = await import('../../components/SearchApp');
  return (props) => <Search {...props} />;
});

const LoadableStudentGroupsDiscovery = loadable<{}>(async () => {
  const { StudentGroupListings } = await import(
    '../../components/StudentGroupsDiscovery'
  );
  return (props) => <StudentGroupListings {...props} />;
});

const LoadableConsentCode = loadable<ConsentCodeProps>(async () => {
  const { ConsentCode } = await import('../forms/consent');
  return (props) => <ConsentCode {...props} />;
});

const WebsiteApplication: React.FC<WebsiteApplicationProps> = ({
  history,
  location,
  appMountState,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routerActions.setRouter(history, location));
  }, [dispatch, history, location]);
  useEffect(() => {
    dispatch(routerActions.announceMount(appMountState));
  }, [appMountState, dispatch]);

  return (
    <ScrollToTop>
      <HelmetProvider>
        <Helmet
          defaultTitle="Sussex Students' Union"
          titleTemplate="%s | Sussex Students' Union"
        />
        <RouterAnalytics />
        <ErrorBoundary>
          <Switch>
            <Route component={Homepage} path="/" exact />
            <Route component={BookMarketApplication} path="/book-market" />
            <Route component={WhatsOn} path="/whats-on" />
            <Route component={LoadableSearchApp} path="/search" />
            <Route
              component={LoadableStudentGroupsDiscovery}
              path="/sport-societies-media/discover"
            />
            <Redirect
              from="/freshers/whatson/"
              to="/whats-on/periods/freshers-week-2019"
            />
            <Redirect
              from="/freshers/terms-conditions/"
              to="/freshers/terms/"
            />
            <Redirect from="/freshers/events-info/" to="/freshers/faq/" />
            <Redirect
              from="/freshers/whats-on/"
              to="/whats-on/periods/freshers-week-2019"
            />
            <Redirect
              from="/freshers/events/"
              to="/whats-on/periods/freshers-week-2019"
            />
            <Redirect
              from="/services/outlets/*"
              to="/about-us/shops-and-bars/*"
            />
            <Route component={ContentAPI} path="/freshers" />
            {/*<EventDiscovery path="/event-discovery" />*/}
            <Route component={ContentAPI} path="/get-involved" exact />
            <Route
              component={ContentAPI}
              path="/get-involved/societies-and-student-media"
            />
            <Route component={ContentAPI} path="/about-us/officers" />
            <Route component={ContentAPI} path="/get-involved/sports-clubs" />
            <Route
              component={ContentAPI}
              path="/get-involved/decision-making"
            />
            <Route component={ContentAPI} path="/volunteer/support" />
            <Route component={ContentAPI} path="/services" />
            <Route component={ContentAPI} path="/support" exact />
            <Route component={ContentAPI} path="/get-involved-next" />
            <Route component={ContentAPI} path="/about-us-next" />
            <Route component={ContentAPI} path="/about-us" />
            <Route
              component={LoadableConsentCode}
              path="/forms/consent/:slug"
            />
            <Route
              component={ContentAPI}
              path="/get-involved/campaigns-toolkit"
            />
            <Route component={ContentAPI} path="/about-us/contact" />
            <Route component={ContentAPI} path="/sport-societies-media" exact />
            <Route component={ContentAPI} path="/about-us/shops-and-bars" />
            <Route component={FourOhFourPage} default />
          </Switch>
        </ErrorBoundary>
      </HelmetProvider>
    </ScrollToTop>
  );
};

export default withRouter(WebsiteApplication);
