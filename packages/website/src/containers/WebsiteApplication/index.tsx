import React, { useEffect } from 'react';
import BookMarketApp from '../bookmarket/BookMarketApp';
import EventsApplication from '../EventsApplication';
import * as routerActions from '../../ducks/router';
import { AppMountState } from '../../ducks/router';
import { ContentPage } from '../content/ContentPage';
import Helmet from 'react-helmet';
import ErrorBoundary from '../../components/ErrorBoundary';
import Homepage from '../../layouts/homepage';
import { FreshersContentAPI } from '../freshers/ContentAPIContainer';
import { FreshersEvents } from '../freshers/FreshersEvents';
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
import { ContentBrowserContainer } from '../ContentBrowser';

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

const LoadableContentBrowser = loadable<ContentBrowserContainer>(async () => {
  const { ContentBrowserContainer } = await import('../ContentBrowser');
  return (props) => <ContentBrowserContainer {...props} />;
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
      <Helmet
        defaultTitle="Sussex Students' Union"
        titleTemplate="%s | Sussex Students' Union"
      />
      <RouterAnalytics />
      <ErrorBoundary>
        <Switch>
          <Route component={Homepage} path="/" exact />
          <Route component={BookMarketApp} path="/book-market" />
          <Route component={LoadableContentBrowser} path="/browse" />
          <Route component={EventsApplication} path="/whats-on" />
          <Route component={LoadableSearchApp} path="/search" />
          <Route
            component={LoadableStudentGroupsDiscovery}
            path="/sport-societies-media/discover"
          />
          <Redirect from="/freshers/freshers-week-events/" to="/freshers" />
          <Route component={FreshersEvents} path="/freshers/whats-on" />
          <Route component={FreshersContentAPI} path="/freshers" />
          {/*<EventDiscovery path="/event-discovery" />*/}
          <Route component={ContentAPI} path="/get-involved" exact />
          <Route
            component={ContentAPI}
            path="/get-involved/societies-and-student-media"
          />
          <Route component={ContentAPI} path="/about-us/officers" />
          <Route component={ContentAPI} path="/get-involved/sports-clubs" />
          <Route component={ContentAPI} path="/get-involved/decision-making" />
          <Route component={ContentAPI} path="/volunteer/support" />
          <Route component={ContentAPI} path="/services" />
          <Route component={ContentAPI} path="/support" exact />
          <Route component={ContentAPI} path="/get-involved-next" />
          <Route component={ContentAPI} path="/about-us-next" />
          <Route component={ContentAPI} path="/about-us" />
          <Route
            component={ContentAPI}
            path="/get-involved/campaigns-toolkit"
          />
          <Route component={ContentAPI} path="/about-us/contact" />
          <Route component={FourOhFourPage} default />
        </Switch>
      </ErrorBoundary>
    </ScrollToTop>
  );
};

export default withRouter(WebsiteApplication);
