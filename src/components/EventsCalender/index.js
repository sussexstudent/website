import React from 'react';
import cx from 'classnames';
import { compose } from 'recompose';
import { Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import sortBy from 'lodash/sortBy';
import orderBy from 'lodash/orderBy';
import toPairs from 'lodash/toPairs';
import padStart from 'lodash/padStart';
import groupBy from 'lodash/groupBy';
import isBefore from 'date-fns/isBefore';
import getYear from 'date-fns/getYear';
import startOfDay from 'date-fns/startOfDay';
import getMonth from 'date-fns/getMonth';
import addMonths from 'date-fns/addMonths';
import setHours from 'date-fns/setHours';
import addDays from 'date-fns/addDays';
import getDayOfYear from 'date-fns/getDayOfYear';
import isSameDay from 'date-fns/isSameDay';
import formatDate from 'date-fns/format';
import HydroLeaf from '~components/HydroLeaf';
import EventsCalenderItem from './EventsCalenderItem';
import EventDetailPage from '../EventDetailPage/index';
import EventListingsQuery from './EventListings.graphql';
import apolloHandler from '../apolloHandler';

const DATE_TODAY = new Date();
const DATE_TOMORROW = addDays(DATE_TODAY, 1);

const EVENT_PART = {
  CONTAINED: 'SINGLE',
  SPAN_START: 'SPAN_START',
  SPAN_END: 'SPAN_END',
};
const weekFromNow = setHours(addDays(new Date(), 7), 0);
const now = setHours(new Date(), 0);
const rightNow = new Date();
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
      if (isBefore(event.endDate, rightNow)) {
        return;
      }

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
  if (isSameDay(new Date(), part.date)) {
    return 'Today';
  }

  if (isSameDay(part.date, addDays(new Date(), 1))) {
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
  data: { allEvents },
  disableHeader = false,
  useAnchors = false,
}) {
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
                              isSameDay(part.date, DATE_TODAY) ||
                              isSameDay(part.date, DATE_TOMORROW)
                                ? ' - Do MMMM'
                                : isBefore(part.date, weekFromNow)
                                  ? 'Do MMMM'
                                  : 'MMMM'
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

const EventsContainer = compose(
  graphql(EventListingsQuery, {
    options: props => ({
      variables: {
        filter: props.filter || {
          fromTime: startOfDay(new Date()).toISOString(),
          toTime: addMonths(startOfDay(new Date()), 3).toISOString(),
        },
      },
    }),
  }),
  apolloHandler()
)(EventsCalender);

const EventsApplication = () => (
  <Switch>
    <Route path="/whats-on/" exact component={EventsContainer} />
    <Route path="/whats-on/**-:eventId" component={EventDetailPage} />
  </Switch>
);

export default compose(HydroLeaf({ disableSSR: true }))(EventsApplication);
