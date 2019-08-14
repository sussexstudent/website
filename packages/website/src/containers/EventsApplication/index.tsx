import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { RouteComponent } from '@ussu/common/src/types/routes';
import { ScrollToTop } from '../../components/ScrollToTop';
import { EventBundleProps } from '../EventsCalender/EventBundle';
import { EventsListProps } from '../EventsCalender';
import { EventBrandingPeriodProps } from '../EventsCalender/EventBrandingPeriod';
import { EventDetailPageProps } from '../EventDetailPage';
import loadable from '@loadable/component';
import { WhatsOnSectionbar } from './WhatsOnSectionbar';
import { BrandingContainer } from './branding/components';
import { WhatsOnThemingProvider } from './WhatsOnBrandingContext';

const LoadableListings = loadable<EventsListProps>(async () => {
  const { EventsList } = await import('../EventsCalender');
  return (props) => <EventsList {...props} />;
});

const LoadableListingsBranding = loadable<EventBrandingPeriodProps>(
  async () => {
    const { EventBrandingPeriod } = await import(
      '../EventsCalender/EventBrandingPeriod'
    );
    return (props) => <EventBrandingPeriod {...props} />;
  },
);

const LoadableBundle = loadable<EventBundleProps>(async () => {
  const { EventBundle } = await import('../EventsCalender/EventBundle');
  return (props) => <EventBundle {...props} />;
});

const LoadableDetail = loadable<EventDetailPageProps>(async () => {
  const { EventDetailPage } = await import('../EventDetailPage');
  return (props) => <EventDetailPage {...props} />;
});

type EventsApplicationProps = RouteComponent;

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

const EventsApplication: React.FC<EventsApplicationProps> = () => {
  return (
    <WhatsOnThemingProvider>
      <ScrollToTop>
        <BrandingContainer>
          <div className="u-keep-footer-down js-expand-container">
            <WhatsOnSectionbar />
            <Switch>
              <Route component={LoadableListings} path="/whats-on" exact />
              <Route
                component={LoadableBundle}
                path="/whats-on/bundle/:bundleSlug"
                exact
              />
              <Redirect
                from="/whats-on/period/:brandSlug"
                to="/whats-on/periods/:brandSlug"
              />
              <Redirect
                from="/whats-on/collections/:brandSlug"
                to="/whats-on/periods/:brandSlug"
              />
              <Redirect
                from="/whats-on/collection/:brandSlug"
                to="/whats-on/periods/:brandSlug"
              />
              <Route
                component={LoadableListingsBranding}
                path="/whats-on/periods/:brandSlug"
                exact
              />
              <Route path="/whats-on/**-:eventId" component={LoadableDetail} />
              <Route path="/whats-on/:eventId" component={LoadableDetail} />
            </Switch>
          </div>
        </BrandingContainer>
      </ScrollToTop>
    </WhatsOnThemingProvider>
  );
};

export default EventsApplication;
