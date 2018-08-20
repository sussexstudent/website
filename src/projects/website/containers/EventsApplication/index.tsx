import React from 'react';
// import bind from 'bind-decorator';
// import { debounce } from 'lodash';
import { Link } from '@reach/router';
import { Router, Redirect } from '@reach/router';
import Loadable from 'react-loadable';
import { LoadableLoading } from '~components/LoadableLoading';
import { Sectionbar, SectionbarItem } from '~components/Sectionbar';
// import { removePageContainer } from '~libs/hacky';
import { RouteComponent } from '~types/routes';
import { ScrollToTop } from '~components/ScrollToTop';

const EventsListLoader = () =>
  import(/* webpackChunkName: "events.listings" */ '~website/containers/EventsCalender/index');

const EventBrandingPeriodLoader = () =>
  import(/* webpackChunkName: "events.listings.brand" */ '~website/containers/EventsCalender/EventBrandingPeriod');

const EventBundleLoader = () =>
  import(/* webpackChunkName: "events.listings.bundle" */ '~website/containers/EventsCalender/EventBundle');

const LoadableListings = Loadable({
  loading: LoadableLoading,
  loader: EventsListLoader,
  render({ EventsList }: { EventsList: any }, props) {
    return <EventsList {...props} />;
  },
}) as any;

const LoadableListingsBranding = Loadable({
  loading: LoadableLoading,
  loader: EventBrandingPeriodLoader,
  render({ EventBrandingPeriod }: { EventBrandingPeriod: any }, props) {
    return <EventBrandingPeriod {...props} />;
  },
}) as any;

const LoadableBundle = Loadable({
  loading: LoadableLoading,
  loader: EventBundleLoader,
  render: ({ EventBundle }: { EventBundle: any }, props: any) => {
    return <EventBundle {...props} />;
  },
}) as any;

const LoadableDetail = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "events.detail" */ '~website/containers/EventDetailPage'),
});

type EventsApplicationProps = RouteComponent;

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
  //
  // componentDidMount() {
  //   removePageContainer();
  //   window.addEventListener('scroll', debounce(this.onScroll, 100));
  // }

  // @bind
  // onScroll() {
  //   if (this.props.location.pathname === '/whats-on' && window.scrollY !== 0) {
  //     this.setState({ currentListingsScrollPosition: window.scrollY });
  //   }
  // }
  //
  // componentDidUpdate(prevProps: EventsApplicationProps) {
  //   if (
  //     this.props.location.pathname === '/whats-on' &&
  //     this.props.location.pathname !== prevProps.location.pathname &&
  //     this.state.currentListingsScrollPosition !== null
  //   ) {
  //     requestAnimationFrame(() =>
  //       window.scrollTo({ top: this.state.currentListingsScrollPosition }),
  //     );
  //   }
  // }

  render() {
    return (
      <ScrollToTop>
        <div className="u-keep-footer-down js-expand-container">
          <Sectionbar title="What's on">
            <SectionbarItem>
              <Link to={'/whats-on'}>Listings</Link>
            </SectionbarItem>
            <SectionbarItem>
              <a
                href={
                  '/sport-societies-media/information-for-committee-members/events-trips/'
                }
              >
                Hold an event
              </a>
            </SectionbarItem>
          </Sectionbar>
          <Router>
            <LoadableListings path="/" exact />
            <LoadableBundle path="/bundle/:bundleSlug" exact />
            <Redirect
              from="period/:brandSlug"
              to="/whats-on/periods/:brandSlug"
            />
            <Redirect
              from="collections/:brandSlug"
              to="/whats-on/periods/:brandSlug"
            />
            <Redirect
              from="collection/:brandSlug"
              to="/whats-on/periods/:brandSlug"
            />
            <LoadableListingsBranding path="periods/:brandSlug" exact />
            <LoadableDetail path="*" />
            <LoadableDetail path=":eventPath" />
          </Router>
        </div>
      </ScrollToTop>
    );
  }
}

export default EventsApplication;
