import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { History, Location } from 'history';
import BookMarketApp from '~components/bookmarket/BookMarketApp';
import EventsApplication from '~components/EventsApplication';
import * as routerActions from '../../projects/website/ducks/router';
import { connect } from 'react-redux';
import { ContentPage } from '~components/content/ContentPage';
import KnowledgeBaseApp from '~components/kb/KnowledgeBaseApplication';
import { compose } from 'recompose';
import { AppMountState } from '../../projects/website/ducks/router';
import ContentExplorer from '../../projects/website/layouts/ContentExplorer';
import { LoadableLoading } from '~components/LoadableLoading';
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';

interface WebsiteApplicationProps {
  setRouter: typeof routerActions.setRouter;
  announceMount: typeof routerActions.announceMount;
  history: History;
  location: Location;
  appMountState: AppMountState;
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
});

const LoadableStudentGroupsDiscovery = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "sgd" */ '~components/StudentGroupsDiscovery'),
});

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
      <React.Fragment>
        <Helmet
          defaultTitle="Sussex Students' Union"
          titleTemplate="%s | Sussex Students' Union"
        />
        <Switch>
          <Route path="/book-market" component={BookMarketApp} />
          <Route path="/whats-on" component={EventsApplication as any} />
          <Route path="/kb" component={KnowledgeBaseApp} />
          <Route path="/search" component={LoadableSearchApp} />
          <Route
            path="/sport-societies-media/discover"
            component={LoadableStudentGroupsDiscovery}
          />
          <Route path="/freshers" component={FreshersContentAPI} />
          <Route path="/get-involved" component={ContentAPI} exact />
          <Route path="/support" component={ContentAPI} exact />
          <Route path="/content-explorer" component={ContentExplorer} exact />
        </Switch>
      </React.Fragment>
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
