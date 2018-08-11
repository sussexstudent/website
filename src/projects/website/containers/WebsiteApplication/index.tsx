import React from 'react';
import { Router, WindowLocation, NavigateFn } from '@reach/router';
import { History } from 'history';
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
import EventDiscovery from '~website/containers/EventDiscovery';
import Homepage from '~website/layouts/homepage';
import { RouteComponent } from '~types/routes';

interface WebsiteApplicationProps {
  setRouter: typeof routerActions.setRouter;
  announceMount: typeof routerActions.announceMount;
  history: History;
  appMountState: AppMountState;
  location: WindowLocation;
  navigate: NavigateFn;
}

const ContentAPI = (props: any) => (
  <ContentPage path={props.location.pathname} />
);

const FreshersContentAPI = (props: any) => (
  <div className="FreshersSite u-keep-footer-down">
    <ContentPage path={props.location.pathname} />
  </div>
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

class WebsiteApplication extends React.Component<WebsiteApplicationProps> {
  componentDidMount() {
    console.log(this.props);
    this.props.setRouter(this.props.navigate, this.props.location);
    this.props.announceMount(this.props.appMountState);
  }

  componentDidUpdate() {
    this.props.setRouter(this.props.navigate, this.props.location);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet
          defaultTitle="Sussex Students' Union"
          titleTemplate="%s | Sussex Students' Union"
        />
        <ErrorBoundary>
          <Router>
            <Homepage path="/" />
            <BookMarketApp path="/book-market/*" />
            <EventsApplication path="/whats-on/*" />
            <LoadableSearchApp path="/search" />
            <LoadableStudentGroupsDiscovery path="/sport-societies-media/discover" />
            <FreshersContentAPI path="/freshers" />
            <EventDiscovery path="/event-discovery" />
            <ContentAPI path="/get-involved" exact />
            <ContentAPI path="/content-root-example" />
            <ContentAPI path="/support" exact />
            <ContentExplorer path="/content-explorer" exact />
          </Router>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default compose<
  WebsiteApplicationProps,
  {
    appMountState: AppMountState;
    location: WindowLocation;
    navigate: NavigateFn;
  }
>(
  connect(
    null,
    {
      setRouter: routerActions.setRouter,
      announceMount: routerActions.announceMount,
    },
  ),
)(WebsiteApplication);
