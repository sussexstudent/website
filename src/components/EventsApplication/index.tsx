import React from 'react';
import bind from 'bind-decorator';
import { debounce } from 'lodash';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import HydroLeaf from '~components/HydroLeaf';
import Loadable from 'react-loadable';
import { LoadableLoading } from '~components/LoadableLoading';
import { Provider } from '../../types/hydro';

const EventsListLoader = () =>
  import(/* webpackChunkName: "events.listings" */ '~components/EventsCalender');

const LoadableListings = Loadable({
  loading: LoadableLoading,
  loader: EventsListLoader,
  render({ EventsList }: { EventsList: any }, props) {
    return <EventsList {...props} />;
  },
}) as any;

const LoadableListingsBranding = Loadable({
  loading: LoadableLoading,
  loader: EventsListLoader,
  render({ EventsBrandingPeriod }: { EventsBrandingPeriod: any }, props) {
    return <EventsBrandingPeriod {...props} />;
  },
}) as any;

const LoadableDetail = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "events.detail" */ '~components/EventDetailPage'),
});

interface Props {}

type EventsApplicationProps = RouteComponentProps<{}> & Props;

interface EventsApplicationState {
  currentListingsScrollPosition: number;
}

class EventsApplication extends React.Component<
  EventsApplicationProps,
  EventsApplicationState
> {
  state = {
    currentListingsScrollPosition: -1,
  };

  componentDidMount() {
    window.addEventListener('scroll', debounce(this.onScroll, 100));
  }

  @bind
  onScroll() {
    if (this.props.location.pathname === '/whats-on' && window.scrollY !== 0) {
      this.setState({ currentListingsScrollPosition: window.scrollY });
    }
  }

  componentDidUpdate(prevProps: EventsApplicationProps) {
    if (
      this.props.location.pathname === '/whats-on' &&
      this.props.location.pathname !== prevProps.location.pathname &&
      this.state.currentListingsScrollPosition !== null
    ) {
      requestAnimationFrame(() =>
        window.scrollTo({ top: this.state.currentListingsScrollPosition }),
      );
    }
  }

  render() {
    return (
      <div className="u-keep-footer-down">
        <Switch>
          <Route path="/whats-on/" exact component={LoadableListings} />
          <Route
            path="/whats-on/period/:brandSlug"
            exact
            component={LoadableListingsBranding}
          />
          <Route
            path="/whats-on/collection/:brandSlug"
            exact
            component={LoadableListingsBranding}
          />
          <Route path="/whats-on/**-:eventId" component={LoadableDetail} />
          <Route path="/whats-on/:eventId" component={LoadableDetail} />
        </Switch>
      </div>
    );
  }
}

export default HydroLeaf({
  disableSSR: true,
  providers: [Provider.Apollo, Provider.Router],
})(withRouter(EventsApplication as any));
