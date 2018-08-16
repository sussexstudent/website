import React from 'react';
import { Router, WindowLocation, NavigateFn, Location, Link } from '@reach/router';
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
  <ContentPage path={props.location.pathname} navigate={props.navigate} />
);

const FreshersContentAPI = (props: any) => (
  <div className="FreshersSite u-keep-footer-down">
    <div className="LokiContainer">
      <ul className="FreshersMenu">
        <li><Link to="/freshers">Home</Link>        </li>

        <li><Link to="/freshers/whats-on">What's on</Link></li>
          <li><Link to="/freshers/events-info">Event info</Link></li>
      </ul>
    </div>
    <ContentPage path={props.location.pathname} navigate={props.navigate} />
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

const LoadableContentBrowser = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "ContentBrowser" */ '~website/containers/ContentBrowser'),
}) as any;

class WebsiteApplication extends React.Component<WebsiteApplicationProps> {
  componentDidMount() {
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
        <Location>
          {({ location }) => (
            <ErrorBoundary location={location}>
              <Router>
                <Homepage path="/homepage-next" />
                <BookMarketApp path="/book-market/*" />
                <LoadableContentBrowser path="/browse/*" />
                <EventsApplication path="/whats-on/*" />
                <LoadableSearchApp path="/search" />
                <LoadableStudentGroupsDiscovery path="/sport-societies-media/discover" />
                <FreshersContentAPI path="/freshers/*" />
                <EventDiscovery path="/event-discovery" />
                <ContentAPI path="/get-involved" exact />
                <ContentAPI path="/services/*" />
                <ContentAPI path="/support" exact />
                <ContentAPI path="/website-knowledge-base/*" />
                <ContentAPI path="/get-involved-next/" />
                <ContentAPI path="/about-us-next/*" />
                <ContentExplorer path="/content-explorer/*" exact />
              </Router>
            </ErrorBoundary>
          )}
        </Location>
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
