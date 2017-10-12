import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import formatDate from 'date-fns/format';
import { graphql } from 'react-apollo';
import ContentCard from '../ContentCard';
import Image from '../Image';
import JsonLd from '../JsonLd';
import Loader from '../Loader';
import BackBar from '../BackBar/Link';
import Button from '../Button';
import DetailPageQuery from './EventsDetailPage.graphql';
import EventsCalenderItem from '../EventsCalender/EventsCalenderItem';
import minimalisticTimeRenderer from '../../libs/minimalisticTimeRenderer';

/* eslint-disable */
class EventDetailPage extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loader />;
    }

    const event = this.props.data.event;
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    return (
      <div>
        <Helmet>
          <title>{`${event.title} | What's on | Sussex Students' Union`}</title>
          <meta name="description" content={event.shortDescription} />
          {event.featuredImage ? (
            <meta
              property="og:image"
              content={`https://su.imgix.net/${event.featuredImage
                .resource}?h=1260&w=2400&fit=crop&crop=focal&auto=format`}
            />
          ) : null}
          <meta property="og:description" content={event.shortDescription} />

          <meta
            name="twitter:card"
            content={event.featuredImage ? 'summary_large_image' : 'summary'}
          />
          <meta name="twitter:site" content="@ussu" />
          <meta name="twitter:title" content={event.title} />
          <meta name="twitter:description" content={event.shortDescription} />
          {event.featuredImage ? (
            <meta
              name="twitter:image"
              content={`https://su.imgix.net/${event.featuredImage
                .resource}?h=1200&w=2400&fit=crop&crop=focal&auto=format`}
            />
          ) : null}
        </Helmet>
        <JsonLd
          data={{
            '@context': 'http://schema.org',
            '@type': 'Event',
            location: {
              '@type': 'Place',
              name:
                event.venue === null ? event.locationDisplay : event.venue.name,
            },
            name: event.title,
            startDate: event.startTime,
            endDate: event.endTime,
          }}
        />
        <BackBar to="/whats-on" useLink color="blue">
          Events listings
        </BackBar>
        <div className="Layout Layout--sidebar-right EventDetail">
          <div>
            <ContentCard bleed>
              {event.featuredImage ? (
                <div className="u-responsive-ratio u-responsive-ratio--ultra-wide">
                  <Image
                    className="ResponsiveImage"
                    src={event.featuredImage.resource}
                  />
                </div>
              ) : null}
              {event.brand !== null ? (
                <div className="EventDetail__brand">{event.brand.name}</div>
              ) : null}
              {event.bundle !== null ? (
                <div className="EventDetail__bundle">{event.bundle.name}</div>
              ) : null}
              <div className="EventDetail__details">
                <div className="ContentCard__content">
                  <h2 className="EventDetail__title">{event.title}</h2>
                  <ul className="EventDetail__details-list">
                    {event.parent ? (
                      <li className="EventDetail__details-list-item">
                        <img
                          className="EventDetail__icon"
                          src="https://du9l8eemj97rm.cloudfront.net/events-collection-parent.svg"
                          alt=""
                        />
                        Part of{' '}
                        <Link
                          to={`/whats-on/${event.parent.slug}-${event.parent
                            .eventId}`}
                        >
                          {event.parent.title}
                        </Link>
                      </li>
                    ) : null}
                    <li className="EventDetail__details-list-item">
                      <img
                        className="EventDetail__icon"
                        src="https://du9l8eemj97rm.cloudfront.net/events-calender.svg"
                        alt=""
                      />
                      {formatDate(startDate, 'dddd D MMMM YYYY')}
                    </li>
                    <li className="EventDetail__details-list-item">
                      <img
                        className="EventDetail__icon"
                        src="https://du9l8eemj97rm.cloudfront.net/events-clock.svg"
                        alt=""
                      />
                      {`${minimalisticTimeRenderer(
                        startDate
                      )} – ${minimalisticTimeRenderer(endDate)}`}
                    </li>
                    {event.locationDisplay !== '' || event.venue !== null ? (
                      <li className="EventDetail__details-list-item">
                        <img
                          className="EventDetail__icon"
                          src="https://du9l8eemj97rm.cloudfront.net/events-pin.svg"
                          alt=""
                        />
                        {event.locationDisplay || event.venue.name}
                      </li>
                    ) : null}
                    {event.children.length > 0 ? (
                      <li className="EventDetail__details-list-item">
                        <img
                          className="EventDetail__icon"
                          src="https://du9l8eemj97rm.cloudfront.net/events-collection.svg"
                          alt=""
                        />
                        <a href="#sub-events">
                          {event.children.length} sub-events
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
              <div className="ContentCard__content">
                <div className="Prose EventDetail__body">
                  {event.bodyHtml !== '' ? (
                    <div dangerouslySetInnerHTML={{ __html: event.bodyHtml }} />
                  ) : (
                    <div>{event.shortDescription}</div>
                  )}
                </div>
              </div>
            </ContentCard>
          </div>
          <aside>
            {event.ticketType !== 'NA' ? (
              <ContentCard>
                <h3>Tickets</h3>
                <Button href={event.ticketData}>Buy tickets on Native</Button>
              </ContentCard>
            ) : null}
            <ContentCard>
              For access requirements please contact{' '}
              <a href="mailto:access@sussexstudent.com">
                access@sussexstudent.com
              </a>
            </ContentCard>
          </aside>
        </div>
        {event.children.length > 0 ? (
          <div>
            <span className="u-position-anchor" id="sub-events" />
            <h2 className="Heading Heading--tight">Part of this event</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {event.children.map(childEvent => (
                <div>
                  <EventsCalenderItem part={{ event: childEvent }} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

EventDetailPage.propTypes = {};

export default graphql(DetailPageQuery, {
  options: ({ match }) => ({ variables: { eventId: match.params.eventId } }),
})(EventDetailPage);
