import React from 'react';
import cx from 'classnames';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';
import toPairs from 'lodash/toPairs';
import padStart from 'lodash/padStart';
import groupBy from 'lodash/groupBy';
import isBefore from 'date-fns/is_before';
import getYear from 'date-fns/get_year';
import getMonth from 'date-fns/get_month';
import setHours from 'date-fns/set_hours';
import addDays from 'date-fns/add_days';
import formatDate from 'date-fns/format';
import Loader from '~components/Loader';
import HydroLeaf from '~components/HydroLeaf';
import ScrollToTop from '~components/ScrollToTop';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';
import EventsCalenderItem from './EventsCalenderItem';
import EventDetailPage from '../EventDetailPage/index';

const EVENT_PART = {
  CONTAINED: 'SINGLE',
  SPAN_START: 'SPAN_START',
  SPAN_END: 'SPAN_END',
};
const weekFromNow = setHours(addDays(new Date(), 7), 0);
const now = setHours(new Date(), 0);

function splitEventsInToParts(events) {
  // for all events
  // if single day, add single day event SINGLE
  // if multi day
  // add start MULTI_START
  // each days continuation MULTI_CONT
  // add end MULTI_END
  const parts = [];

  events.forEach((event, index) => {
    // if event.startDate is same day as endDate
    // TODO: Ease nightlife events, keep contained when event only spans to < 6:30am
    if (!event.isOverMultipleDays) {
      parts.push({
        type: EVENT_PART.CONTAINED,
        eventId: index,
        date: event.startDate,
        event,
      });
      return;
    }

    parts.push({
      type: EVENT_PART.SPAN_START,
      eventId: index,
      date: event.startDate,
      event,
    });

    parts.push({
      type: EVENT_PART.SPAN_END,
      eventId: index,
      date: event.endDate,
      event,
    });
  });

  return parts;
}

function poorMonthSort(key) {
  if (key === '0') {
    return 0;
  }

  if (key === 'PAST') {
    return -1;
  }

  if (key.startsWith('MONTH')) {
    const numbers = key.slice(6).split('-');
    const z = parseInt(numbers[0] + padStart(numbers[1], 2, '0'), 10);
    console.log(key, z);
    return z;
  }

  return 2;
}

function organisePartsForUI(eventParts) {
  const orderedParts = sortBy(eventParts, part => part.date);

  // next up 7:

  const partsGrouped = groupBy(orderedParts, event => {
    if (isBefore(event.date, now)) {
      return 'PAST';
    }

    /*
    if (isBefore(event.date, weekFromNow)) {
      return 0;
    }
    */

    return `MONTH:${getYear(event.date)}-${getMonth(event.date)}`;
  });

  const pairs = toPairs(partsGrouped);

  const sorted = orderBy(pairs, pair => poorMonthSort(pair[0]), 'asc');

  const asList = sorted
    .filter(([key]) => key !== 'PAST')
    .map(([key, value]) => ({
      sectionTitle:
        key === '0' ? 'This week' : formatDate(value[0].date, 'MMMM'),
      parts: value,
    }));

  return asList;
}

function getSmartDate(part) {
  if (isBefore(part.date, weekFromNow)) {
    if (
      part.type === EVENT_PART.SPAN_END &&
      isBefore(part.event.startDate, now)
    ) {
      return `until ${formatDate(part.date, 'dddd')}`;
    }

    if (part.type === EVENT_PART.SPAN_START) {
      return `starts ${formatDate(part.date, 'dddd')}`;
    }

    return formatDate(part.date, 'dddd');
  }

  return formatDate(part.date, 'ddd Do');
}

function EventsCalender({
  eventsList,
  isLoading,
  disableHeader = false,
  useAnchors = false,
}) {
  if (isLoading) {
    return <Loader dark />;
  }

  const events = eventsList.map(event => ({
    ...event,
    startDate: new Date(event.startTime),
    endDate: new Date(event.endTime),
  }));
  // let previousDay = null;
  const eventParts = splitEventsInToParts(events);
  const uiEvents = organisePartsForUI(eventParts);
  // chunk by day
  return (
    <div>
      {disableHeader !== true
        ? <div className="PageHeader">
            <h1 className="PageHeader__title">
              {"What's on"}
            </h1>
            <div className="PageHeader__treats">
              <a className="Button" href="/hold-an-event">
                Hold your own event
              </a>
            </div>
          </div>
        : null}
      <div className="EventsCalender">
        {uiEvents.map(({ sectionTitle, parts }) =>
          <div className="EventsCalender__section">
            <h2 className="EventsCalender__section-title">
              {sectionTitle}
            </h2>
            <div className="EventsCalender__section-items">
              {parts.map((part, index) => {
                const isFirstOfDate =
                  index < 1 ||
                  getSmartDate(parts[index - 1]) !== getSmartDate(part);

                return (
                  <div className="EventsCalender__part-container">
                    <h3
                      className={cx('EventsCalender__item-date-kicker', {
                        'EventsCalender__item-date-kicker--continuation': !isFirstOfDate,
                      })}
                    >
                      {getSmartDate(part)}
                    </h3>
                    <EventsCalenderItem part={part} useAnchors={useAnchors} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export class EventsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
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
  allEvents(ignoreEmbargo: true ${this.props.limitToFreshers === true
    ? ', brandId: 2'
    : ''}) {
    id
    slug
    title
    startTime
    endTime 
    locationDisplay
    kicker
    shortDescription
    url
    cost
    ticketLevel
    bundle {
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
      .then(data =>
        this.setState({ isLoading: false, data: data.data.allEvents })
      );
  }

  render() {
    const { isLoading, data } = this.state;

    return (
      <EventsCalender {...this.props} isLoading={isLoading} eventsList={data} />
    );
  }
}

const EventsApplication = () =>
  <BrowserRouter basename="/whats-on">
    <ScrollToTop>
      <Switch>
        <Route path="/" exact component={EventsContainer} />
        <Route path="/**-:eventId" component={EventDetailPage} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>;

export default HydroLeaf({ disableSSR: true })(EventsApplication);
