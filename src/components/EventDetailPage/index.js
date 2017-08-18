import React from 'react';
import ContentCard from '../ContentCard';
import getFalmerEndpoint from '../../libs/getFalmerEndpoint';
import Image from '../Image';
import Loader from '../Loader';

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

    return (
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
            <div className="ContentCard__content">
              <div className="EventDetail__details">
                <h2 className="EventDetail__title">
                  {event.title}
                </h2>
                <ul>
                  <li>Date</li>
                  <li>Time</li>
                  <li>
                    {event.locationDisplay}
                  </li>
                </ul>
              </div>
              <div className="Prose EventDetail__body">
                {event.body}
              </div>
            </div>
          </ContentCard>
        </div>
        <aside>
          <ContentCard>Sidebar go to radar</ContentCard>
        </aside>
      </div>
    );
  }
}

EventDetailPage.propTypes = {};

export default EventDetailPage;
