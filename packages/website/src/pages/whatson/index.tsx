import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { RouteComponent } from '@ussu/common/src/types/routes';
import { ScrollToTop } from '../../components/ScrollToTop';
import { EventBundleProps } from './WhatsOnListings/EventBundle';
import { EventsListProps } from './WhatsOnListings';
import { EventBrandingPeriodProps } from './WhatsOnListings/EventBrandingPeriod';
import { EventDetailPageProps } from './EventDetailPage';
import loadable from '@loadable/component';
import { BrandingContainer } from './branding/components';
import { WhatsOnThemingProvider } from './WhatsOnBrandingContext';
import {
  Wayfinder,
  WayfinderTopLevel,
  WayfinderItem,
} from '../../components/Wayfinder';
import LIVE_BRANDING_PERIOD_QUERY from './LiveBrandingPeriods.graphql';
import { useQuery } from '@apollo/react-hooks';
import { Brand } from '@ussu/common/src/types/events';

const LoadableListings = loadable<EventsListProps>(async () => {
  const { EventsList } = await import('./WhatsOnListings');
  return (props) => <EventsList {...props} />;
});

const LoadableListingsBranding = loadable<EventBrandingPeriodProps>(
  async () => {
    const { EventBrandingPeriod } = await import(
      './WhatsOnListings/EventBrandingPeriod'
    );
    return (props) => <EventBrandingPeriod {...props} />;
  },
);

const LoadableBundle = loadable<EventBundleProps>(async () => {
  const { EventBundle } = await import('./WhatsOnListings/EventBundle');
  return (props) => <EventBundle {...props} />;
});

const LoadableDetail = loadable<EventDetailPageProps>(async () => {
  const { EventDetailPage } = await import('./EventDetailPage');
  return (props) => <EventDetailPage {...props} />;
});

const LoadableMyProgramme = loadable(async () => {
  const { WhatsOnMyProgramme } = await import('./WhatsOnMyProgramme');
  return (props) => <WhatsOnMyProgramme {...props} />;
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

export const WhatsOn: React.FC<EventsApplicationProps> = () => {
  const { data } = useQuery(LIVE_BRANDING_PERIOD_QUERY);

  return (
    <WhatsOnThemingProvider>
      <ScrollToTop>
        <BrandingContainer>
          <div className="u-keep-footer-down js-expand-container">
            <Wayfinder>
              <WayfinderTopLevel title="What's on" to="/whats-on">
                {/*<WayfinderItem to="/whats-on/my-programme">*/}
                {/*  My Programme*/}
                {/*</WayfinderItem>*/}
                {data?.allBrandingPeriods && data.allBrandingPeriods.length > 0
                  ? data.allBrandingPeriods.map((period: Brand) => (
                      <WayfinderItem
                        key={period.slug}
                        to={`/whats-on/periods/${period.slug}`}
                      >
                        {period.name}
                      </WayfinderItem>
                    ))
                  : null}
                <WayfinderItem to="/get-involved/societies-and-student-media/guides/events/hold-event'">
                  Hold an event
                </WayfinderItem>
              </WayfinderTopLevel>
            </Wayfinder>
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
              <Route
                path="/whats-on/my-programme"
                component={LoadableMyProgramme}
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
