import React from 'react';
import cx from 'classnames';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider, graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';
import toPairs from 'lodash/toPairs';
import padStart from 'lodash/padStart';
import groupBy from 'lodash/groupBy';
import isBefore from 'date-fns/is_before';
import getYear from 'date-fns/get_year';
import startOfDay from 'date-fns/start_of_day';
import getMonth from 'date-fns/get_month';
import addMonths from 'date-fns/add_months';
import setHours from 'date-fns/set_hours';
import addDays from 'date-fns/add_days';
import getDayOfYear from 'date-fns/get_day_of_year';
import isToday from 'date-fns/is_today';
import isTomorrow from 'date-fns/is_tomorrow';
import formatDate from 'date-fns/format';
import Loader from '~components/Loader';
import HydroLeaf from '~components/HydroLeaf';
import ScrollToTop from '~components/ScrollToTop';
import EventsCalenderItem from './EventsCalenderItem';
import EventDetailPage from '../EventDetailPage/index';
import getApolloClientForFalmer from '../../libs/getApolloClientForFalmer';
import EventListingsQuery from './EventListings.graphql';

const EVENT_PART = {
  CONTAINED: 'SINGLE',
  SPAN_START: 'SPAN_START',
  SPAN_END: 'SPAN_END',
};
const weekFromNow = setHours(addDays(new Date(), 7), 0);
const now = setHours(new Date(), 0);
/* eslint-disable no-nested-ternary */
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
    return z;
  }

  return 2;
}

function chunkEventsToRows(events) {
  const eventNest = [];
  const keysMap = {};

  events.forEach(event => {
    const dayIndex = getDayOfYear(event.date);
    if (Object.hasOwnProperty.call(keysMap, dayIndex)) {
      eventNest[keysMap[dayIndex]].push(event);
    } else {
      keysMap[dayIndex] = eventNest.push([event]) - 1;
    }
  });

  console.log(eventNest);

  return eventNest;
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
      parts: chunkEventsToRows(value),
    }));

  return asList;
}

function getSmartDate(part) {
  if (isToday(part.date)) {
    return 'Today';
  }

  if (isTomorrow(part.date)) {
    return 'Tomorrow';
  }

  if (isBefore(part.date, weekFromNow)) {
    // if (
    //   part.type === EVENT_PART.SPAN_END &&
    //   isBefore(part.event.startDate, now)
    // ) {
    //   return `until ${formatDate(part.date, 'dddd')}`;
    // }
    //
    // if (part.type === EVENT_PART.SPAN_START) {
    //   return `starts ${formatDate(part.date, 'dddd')}`;
    // }

    return formatDate(part.date, 'dddd');
  }

  return formatDate(part.date, 'ddd Do');
}

function EventsCalender({
  data: { loading, allEvents },
  disableHeader = false,
  useAnchors = false,
}) {
  if (loading) {
    return <Loader dark />;
  }

  const events = allEvents.edges.map(({ node }) => ({
    ...node,
    startDate: new Date(node.startTime),
    endDate: new Date(node.endTime),
  }));
  // let previousDay = null;
  const eventParts = splitEventsInToParts(events);
  const uiEvents = organisePartsForUI(eventParts);
  // chunk by day

  console.log(uiEvents);
  return (
    <div>
      {disableHeader ? null : (
        <Helmet>
          <title>{`What's on | Sussex Students' Union`}</title>
        </Helmet>
      )}
      {disableHeader !== true ? (
        <div className="PageHeader">
          <h1 className="PageHeader__title">{"What's on"}</h1>
          <div className="PageHeader__treats">
            <a className="Button" href="/hold-an-event">
              Hold your own event
            </a>
          </div>
        </div>
      ) : null}
      <div className="EventsCalender">
        {uiEvents.map(({ sectionTitle, parts }) => (
          // sectionTitle might not be unique in the future
          <div className="EventsCalender__section" key={sectionTitle}>
            <h2 className="EventsCalender__section-title">{sectionTitle}</h2>
            {parts.map(chunk => (
              <div className="EventsCalender__section-items">
                {chunk.map((part, index) => {
                  const isFirstOfDate =
                    index < 1 ||
                    getSmartDate(chunk[index - 1]) !== getSmartDate(part);
                  return (
                    <div className="EventsCalender__part-container" key={index}>
                      {isFirstOfDate ? (
                        <h3 className={cx('EventsCalender__item-date-kicker')}>
                          {getSmartDate(part)}{' '}
                          <span className="EventsCalender__item-date-kicker--continuation">
                            {formatDate(
                              part.date,
                              isToday(part.date) || isTomorrow(part.date)
                                ? ' - Do MMMM'
                                : isBefore(weekFromNow) ? 'Do MMMM' : 'MMMM'
                            )}
                          </span>
                        </h3>
                      ) : (
                        <h3
                          className={cx(
                            'EventsCalender__item-date-kicker EventsCalender__item-date-kicker--continuation'
                          )}
                        >
                          {formatDate(part.date, 'dddd Do MMMM')}
                        </h3>
                      )}
                      <EventsCalenderItem part={part} useAnchors={useAnchors} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const EventsContainer = graphql(EventListingsQuery, {
  options: props => ({
    variables: {
      filter: props.filter || {
        fromTime: startOfDay(new Date()).toISOString(),
        toTime: addMonths(startOfDay(new Date()), 3).toISOString(),
      },
    },
  }),
})(EventsCalender);

const EventsApplication = () => (
  <ApolloProvider client={getApolloClientForFalmer}>
    <BrowserRouter basename="/whats-on">
      <ScrollToTop>
        <Switch>
          <Route path="/" exact component={EventsContainer} />
          <Route path="/**-:eventId" component={EventDetailPage} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  </ApolloProvider>
);

export default HydroLeaf({ disableSSR: true })(EventsApplication);
