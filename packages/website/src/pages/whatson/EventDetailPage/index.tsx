import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import {
  ContentCard,
  ContentCardContent,
} from '../../../components/ContentCard';
import { Loader } from '../../../components/Loader';
import DetailPageQuery from './EventsDetailPage.graphql';
import { WhatsOnEventCard } from '../WhatsOnEventCard';
import { Event, TicketType } from '@ussu/common/src/types/events';
import { AspectRatio, OneImageBackground } from '../../../components/OneImage';
import { EventDetailDetails } from './EventDetailDetails';
import { EventDetailSidebar } from './EventDetailSidebar';
import { MSLEventCommunication } from './MSLEventCommunication';
import { EventDetailMetadata } from './EventDetailMetadata';
import { PatternPlaceholder } from '../../../components/PatternPlaceholder';
import { RouteComponentProps } from 'react-router-dom';
import { ScrollToTop } from '../../../components/ScrollToTop';
import { useQuery } from '@apollo/react-hooks';
import { BundleBanner } from '../branding/components';
import {
  setBrandingPeriod,
  useWhatsOnThemingContext,
} from '../WhatsOnBrandingContext';
import { InternalAppLink } from '../../../components/InternalAppLink';

interface RouteParams {
  [0]: string;
  eventId: string;
}

export type EventDetailPageProps = RouteComponentProps<RouteParams>;

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  match,
  history,
}) => {
  const dispatch = useWhatsOnThemingContext()[1];
  const [mslData, setMslData] = useState<any>(null);
  // const [_ticketModal, setTicketModal] = useState(false);
  const { data, loading } = useQuery(DetailPageQuery, {
    variables: { eventId: match.params.eventId },
  });

  const event = data?.event;

  useEffect(() => {
    if (data?.event) {
      const event = data.event;
      if (
        match.params.eventId === event.eventId.toString() &&
        match.params[0] !== event.slug
      ) {
        history.replace(`/whats-on/${event.slug}-${event.eventId}`);
      }
      if (event.brand && event.brand.slug) {
        dispatch(setBrandingPeriod(event.brand.slug));
      }
    }
  }, [data, dispatch, history, match.params]);

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <ScrollToTop>
      <div
        className={cx('EventDetail', {
          'EventDetail--customImage': event.featuredImage,
        })}
      >
        <EventDetailMetadata event={event} />
        {event.featuredImage ? (
          <div className="EventDetail__hero">
            <div className="LokiContainer">
              <OneImageBackground
                className="EventDetail__hero-container"
                aspectRatio={AspectRatio.r20by9}
                src={event.featuredImage.resource}
              >
                <div className="EventDetail__details">
                  <EventDetailDetails event={event} />
                </div>
              </OneImageBackground>
            </div>

            <OneImageBackground
              className="EventDetail__hero-bg"
              aspectRatio={AspectRatio.r20by9}
              src={event.featuredImage.resource}
            />
          </div>
        ) : (
          <div className="EventDetail__hero">
            <div className="EventDetail__hero-container">
              <div className="EventDetail__details">
                <div className="LokiContainer">
                  <EventDetailDetails event={event} />
                </div>
              </div>
            </div>
            <div className="EventDetail__hero-bg">
              <PatternPlaceholder />
            </div>
          </div>
        )}
        <div className="LokiContainer">
          <div className="Layout--sidebar-right">
            <ContentCard
              bleed
              css={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            >
              <ContentCardContent>
                <div className="Prose type-body-copy">
                  {event.bodyHtml !== '' ? (
                    <div dangerouslySetInnerHTML={{ __html: event.bodyHtml }} />
                  ) : (
                    <div>{event.shortDescription}</div>
                  )}
                  {event.brand && event.brand.eventAppend ? (
                    <div className="type-long-primer">
                      <hr />
                      <div
                        dangerouslySetInnerHTML={{
                          __html: event.brand.eventAppend,
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                {event.venue ? (
                  <div>
                    <h3>{event.venue.name}</h3>
                    {event.venue.websiteLink ? (
                      <InternalAppLink
                        to={event.venue.websiteLink}
                        className="Button"
                      >
                        More information
                      </InternalAppLink>
                    ) : null}
                  </div>
                ) : null}
              </ContentCardContent>
            </ContentCard>
            <div>
              <EventDetailSidebar
                event={event}
                msl={mslData}
                onTicketButton={() => null}
              />
            </div>
          </div>
          {event.children.length > 0 ? (
            <div>
              <span className="u-position-anchor" id="sub-events" />
              <h2 className="Heading Heading--tight">Part of this event</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {event.children.map((childEvent: Event) => (
                  <div>
                    <WhatsOnEventCard part={{ event: childEvent }} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {event.ticketType === TicketType.MSL ? (
            <MSLEventCommunication
              ticketData={event.ticketData}
              onData={setMslData}
            />
          ) : null}

          {/*{event.ticketType === TicketType.MSL ? (*/}
          {/*<TicketsModal*/}
          {/*isOpen={this.state.ticketModalOpen}*/}
          {/*onRequestClose={this.handleCloseTicketModal}*/}
          {/*msl={this.state.msl}*/}
          {/*/>*/}
          {/*) : null}*/}
        </div>
      </div>

      {event.bundle ? (
        <BundleBanner bundle={event.bundle} onEvent={true} />
      ) : null}
    </ScrollToTop>
  );
};
