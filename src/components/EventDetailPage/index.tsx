import React from 'react';
import bind from 'bind-decorator';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import { graphql, ChildProps } from 'react-apollo';
import ContentCard from '../ContentCard';
import JsonLd from '../JsonLd';
import Loader from '../Loader';
import BackBar from '../BackBar/Link';
import DetailPageQuery from './EventsDetailPage.graphql';
import EventsCalenderItem from '../EventsCalender/EventsCalenderItem';
import { Event } from '../../types/events';

import apolloHandler from '~components/apolloHandler';
import { generateStylesForBrand } from '~components/EventsApplication/utils';
import { AspectRatio, OneImage } from '~components/OneImage';
import { EventDetailDetails } from '~components/EventDetailPage/EventDetailDetails';
import { EventDetailSidebar } from '~components/EventDetailPage/EventDetailSidebar';
import { MSLEventCommunication } from '~components/EventDetailPage/MSLEventCommunication';

interface RouteParams {
  [0]: string;
  eventId: number;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

type IProps = OwnProps & ChildProps<OwnProps, any>;

interface IState {
  msl: any;
}

class EventDetailPage extends React.Component<IProps, IState> {
  state = {
    msl: null,
  };

  componentDidUpdate() {
    if (!this.props.data || !this.props.data.event) {
      return;
    }

    const event = this.props.data.event;
    if (this.props.match.params[0] !== event.slug) {
      this.props.history.replace(`/whats-on/${event.slug}-${event.eventId}`);
    }
  }

  @bind
  handleMslCommunication(data: any) {
    this.setState({ msl: data });
  }

  render() {
    if (!this.props.data || this.props.data.loading) {
      return <Loader />;
    }

    const event = this.props.data.event;

    return (
      <div>
        <Helmet>
          <title>{`${event.title} | What's on | Sussex Students' Union`}</title>
          <meta name="description" content={event.shortDescription} />
          {event.featuredImage ? (
            <meta
              property="og:image"
              content={`https://su.imgix.net/${
                event.featuredImage.resource
              }?h=1260&w=2400&fit=crop&crop=focal&auto=format`}
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
              content={`https://su.imgix.net/${
                event.featuredImage.resource
              }?h=1200&w=2400&fit=crop&crop=focal&auto=format`}
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
        <BackBar to="/whats-on" color="blue">
          {`What's on`}
        </BackBar>
        <div className="Layout Layout--sidebar-right EventDetail">
          <div>
            <ContentCard bleed>
              {event.featuredImage ? (
                <OneImage
                  aspectRatio={AspectRatio.r20by9}
                  src={event.featuredImage.resource}
                  alt=""
                />
              ) : null}
              {event.brand !== null ? (
                <Link
                  to={`/whats-on/collection/${event.brand.slug}`}
                  className="EventDetail__brand"
                  style={generateStylesForBrand(event.brand)}
                >
                  {event.brand.name}
                </Link>
              ) : null}
              {event.bundle !== null ? (
                <div className="EventDetail__bundle">{event.bundle.name}</div>
              ) : null}
              <EventDetailDetails event={event} />
              <div className="ContentCard__content">
                <div className="Prose type-body-copy">
                  {event.bodyHtml !== '' ? (
                    <div dangerouslySetInnerHTML={{ __html: event.bodyHtml }} />
                  ) : (
                    <div>{event.shortDescription}</div>
                  )}
                  {event.brand && event.brand.eventAppend ? (
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: event.brand.eventAppend,
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </ContentCard>
          </div>
          <EventDetailSidebar event={event} msl={this.state.msl} />
        </div>
        {event.children.length > 0 ? (
          <div>
            <span className="u-position-anchor" id="sub-events" />
            <h2 className="Heading Heading--tight">Part of this event</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {event.children.map((childEvent: Event) => (
                <div>
                  <EventsCalenderItem part={{ event: childEvent }} />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {event.mslEventId ? (
          <MSLEventCommunication
            mslEventId={event.mslEventId}
            onData={this.handleMslCommunication}
          />
        ) : null}
      </div>
    );
  }
}

export default graphql<any, OwnProps>(DetailPageQuery, {
  options: ({ match }) => ({ variables: { eventId: match.params.eventId } }),
})(apolloHandler()(EventDetailPage));
