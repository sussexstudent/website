import React, { useEffect } from 'react';
import BookMarketApp from '../bookmarket/BookMarketApp';
import EventsApplication from '../EventsApplication';
import * as routerActions from '../../ducks/router';
import { AppMountState } from '../../ducks/router';
import { ContentPage } from '../content/ContentPage';
import { LoadableLoading } from '../../components/LoadableLoading';
import Loadable from 'react-loadable';
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
import {SearchProps} from "../../components/SearchApp";

interface WebsiteApplicationProps extends RouteComponentProps {
  appMountState: AppMountState;
}

const ContentAPI: React.FC<RouteComponentProps> = (props) => (
  <ContentPage path={props.location.pathname} history={props.history} />
);

const LoadableSearchApp = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "searchapp" */ '../../components/SearchApp'),
  render({ Search }, props: SearchProps) {
    return <Search {...props} />
  }

});

const LoadableStudentGroupsDiscovery = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(
      /* webpackChunkName: "sgd" */ '../../components/StudentGroupsDiscovery'
    ),
  render({ StudentGroupListings }, props: {}) {
    return <StudentGroupListings {...props} />
  }
});

const LoadableContentBrowser = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "ContentBrowser" */ '../ContentBrowser'),
  render({ ContentBrowserContainer }, props: RouteComponentProps) {
    return <ContentBrowserContainer {...props} />
  }
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
          <Route component={ContentAPI} path="/get-involved/officers" />
          <Route component={ContentAPI} path="/get-involved/sports-clubs" />
          <Route component={ContentAPI} path="/get-involved/decision-making" />
          <Route component={ContentAPI} path="/services" />
          <Route component={ContentAPI} path="/support" exact />
          <Route component={ContentAPI} path="/get-involved-next" />
          <Route component={ContentAPI} path="/about-us-next" />
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
