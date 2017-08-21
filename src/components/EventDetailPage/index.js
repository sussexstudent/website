import React from 'react';
import formatDate from 'date-fns/format';
import ContentCard from '../ContentCard';
import getFalmerEndpoint from '../../libs/getFalmerEndpoint';
import Image from '../Image';
import Loader from '../Loader';
import BackBar from '../BackBar/Link';
import Button from '../Button';

class EventDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(`${getFalmerEndpoint()}/graphql`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
query EventsCalender {
  event(eventId: ${this.props.match.params.eventId}) {
    id
    slug
    title
    startTime
    endTime 
    locationDisplay
    kicker
    body
    shortDescription
    url
    ticketType
    ticketData
    bundle {
      name
    }
    brand {
      name
    }
    venue {
      name
      websiteLink
    }
    featuredImage {
      resource
    }
  }
}
       `,
      }),
    })
      .then(data => data.json())
      .then(data => this.setState({ isLoading: false, data: data.data.event }));
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const event = this.state.data;
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    return (
      <div>
        <BackBar to="/" useLink color="blue">
          Events listings
        </BackBar>
        <div className="Layout Layout--sidebar-right EventDetail">
          <div>
            <ContentCard bleed>
              {event.featuredImage
                ? <div className="u-responsive-ratio u-responsive-ratio--ultra-wide">
                    <Image
                      className="ResponsiveImage"
                      src={event.featuredImage.resource}
                    />
                  </div>
                : null}
              {event.brand !== null
                ? <div className="EventDetail__brand">
                    {event.brand.name}
                  </div>
                : null}
              {event.bundle !== null
                ? <div className="EventDetail__bundle">
                    {event.bundle.name}
                  </div>
                : null}
              <div className="EventDetail__details">
                <div className="ContentCard__content">
                  <h2 className="EventDetail__title">
                    {event.title}
                  </h2>
                  <ul className="EventDetail__details-list">
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
                      {`${formatDate(startDate, 'h:mma')} - ${formatDate(
                        endDate,
                        'h:mma'
                      )}`}
                    </li>
                    {event.locationDisplay !== ''
                      ? <li className="EventDetail__details-list-item">
                          <img
                            className="EventDetail__icon"
                            src="https://du9l8eemj97rm.cloudfront.net/events-pin.svg"
                            alt=""
                          />
                          {event.locationDisplay}
                        </li>
                      : null}
                  </ul>
                </div>
              </div>
              <div className="ContentCard__content">
                <div className="Prose EventDetail__body">
                  <div dangerouslySetInnerHTML={{ __html: event.body }} />
                </div>
              </div>
            </ContentCard>
          </div>
          <aside>
            {event.ticketType !== 'NA'
              ? <ContentCard>
                  <h3>Tickets</h3>
                  <Button href={event.ticketData}>Buy tickets on Native</Button>
                </ContentCard>
              : null}
            <ContentCard>
              For access requirements please contact{' '}
              <a href="mailto:access@sussexstudent.com">
                access@sussexstudent.com
              </a>
            </ContentCard>
          </aside>
        </div>
      </div>
    );
  }
}

EventDetailPage.propTypes = {};

export default EventDetailPage;
