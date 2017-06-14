import React from 'react';
import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';
import toPairs from 'lodash/toPairs';
import groupBy from 'lodash/groupBy';
import isBefore from 'date-fns/is_before';
import getYear from 'date-fns/get_year';
import getMonth from 'date-fns/get_month';
import setHours from 'date-fns/set_hours';
import addDays from 'date-fns/add_days';
import formatDate from 'date-fns/format';
import Loader from '../Loader';
import HydroLeaf from '../HydroLeaf';
import EventsCalenderItem from './EventsCalenderItem';
import getFalmerEndpoint from '../../libs/getFalmerEndpoint';

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
    const numbers = key.slice(6).split('-').map(parseInt);
    return numbers[0] + numbers[1];
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
    if (isBefore(event.date, weekFromNow)) {
      return 0;
    }

    return `MONTH:${getYear(event.date)}-${getMonth(event.date)}`;
  });

  const pairs = toPairs(partsGrouped);

  const sorted = orderBy(pairs, pair => poorMonthSort(pair[0]), 'desc');

  console.log(sorted);

  const asList = sorted
    .filter(([key]) => key !== 'PAST')
    .map(([key, value]) => ({
      sectionTitle: key === '0'
        ? 'This week'
        : formatDate(value[0].date, 'MMMM'),
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
    return formatDate(part.date, 'dddd');
  }

  return formatDate(part.date, 'ddd Do');
}

function EventsCalender({ data, isLoading }) {
  if (isLoading) {
    return <Loader dark />;
  }

  data.events.forEach(event => {
    console.log(event.startDate, new Date(event.startDate));
  });

  const events = data.events.map(event => ({
    ...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
  }));
  // let previousDay = null;
  const eventParts = splitEventsInToParts(events);
  const uiEvents = organisePartsForUI(eventParts);
  // chunk by day
  return (
    <div className="EventsCalender">
      {uiEvents.map(({ sectionTitle, parts }) => (
        <div className="EventsCalender__section">
          <h2 className="EventsCalender__section-title">{sectionTitle}</h2>
          <div className="EventsCalender__section-items">
            {parts.map(part => (
              <div>
                <h3 className="EventsCalender__item-date-kicker">
                  {getSmartDate(part)}
                </h3>
                <EventsCalenderItem part={part} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

class EventsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
    };
  }

  componentDidMount() {
    fetch(`${getFalmerEndpoint()}/events/`)
      .then(data => data.json())
      .then(data => this.setState({ isLoading: false, data }));
  }

  render() {
    const { isLoading, data } = this.state;

    return <EventsCalender {...this.props} isLoading={isLoading} data={data} />;
  }
}

export default HydroLeaf()(EventsContainer);
