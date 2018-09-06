import React from 'react';
import { History, Location } from 'history';
import BookMarketApp from '~website/containers/bookmarket/BookMarketApp';
import EventsApplication from '~website/containers/EventsApplication';
import * as routerActions from '~website/ducks/router';
import { AppMountState } from '~website/ducks/router';
import { connect } from 'react-redux';
import { ContentPage } from '~website/containers/content/ContentPage';
import { compose } from 'recompose';
import ContentExplorer from '~website/layouts/ContentExplorer';
import { LoadableLoading } from '~components/LoadableLoading';
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import Homepage from '~website/layouts/homepage';
import { RouteComponent } from '~types/routes';
import { FreshersContentAPI } from '~website/containers/freshers/ContentAPIContainer';
import { FreshersEvents } from '~website/containers/freshers/FreshersEvents';
import { RouterAnalytics } from '~components/RouterAnalytics';
import { FourOhFourPage } from '~website/containers/content/FourOhFourPage';
import { Route, Switch, Redirect, withRouter } from 'react-router';
import { ScrollToTop } from '~components/ScrollToTop';

interface WebsiteApplicationProps {
  setRouter: typeof routerActions.setRouter;
  announceMount: typeof routerActions.announceMount;
  history: History;
  appMountState: AppMountState;
  location: Location;
}

const ContentAPI = (props: any) => (
  <ContentPage path={props.location.pathname} history={props.history} />
);

const LoadableSearchApp = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "searchapp" */ '~components/SearchApp'),
}) as React.SFC<RouteComponent>;

const LoadableStudentGroupsDiscovery = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "sgd" */ '~components/StudentGroupsDiscovery'),
}) as React.SFC<RouteComponent>;

const LoadableContentBrowser = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "ContentBrowser" */ '~website/containers/ContentBrowser'),
}) as any;

const FourOhFourPageRoute = FourOhFourPage as any;

class WebsiteApplication extends React.Component<WebsiteApplicationProps> {
  componentDidMount() {
    this.props.setRouter(this.props.history, this.props.location);
    this.props.announceMount(this.props.appMountState);
  }

  componentDidUpdate() {
    this.props.setRouter(this.props.history, this.props.location);
  }

  render() {
    return (
      <ScrollToTop>
        <Helmet
          defaultTitle="Sussex Students' Union"
          titleTemplate="%s | Sussex Students' Union"
        />
        <RouterAnalytics />
        <ErrorBoundary>
          <Switch>
            <Route component={Homepage} path="/homepage" />
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
            <Route component={ContentAPI} path="/services" />
            <Route component={ContentAPI} path="/support" exact />
            <Route component={ContentAPI} path="/get-involved-next" />
            <Route component={ContentAPI} path="/about-us-next" />
            <Route component={ContentExplorer} path="/content-explorer" exact />
            <Route component={FourOhFourPageRoute} default />
          </Switch>
        </ErrorBoundary>
      </ScrollToTop>
    );
  }
}

export default compose<
  WebsiteApplicationProps,
  {
    appMountState: AppMountState;
  }
>(
  withRouter,
  connect(
    null,
    {
      setRouter: routerActions.setRouter,
      announceMount: routerActions.announceMount,
    },
  ),
)(WebsiteApplication);
