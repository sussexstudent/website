import React from 'react';
import { Event } from '@ussu/common/src/types/events';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import getHours from 'date-fns/getHours';
import formatDate from 'date-fns/format';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';
import CalendarIcon from '@ussu/common/src/icons/events-calender.svg';
import ClockIcon from '@ussu/common/src/icons/events-clock.svg';
import CollectionIcon from '@ussu/common/src/icons/events-collection.svg';
import CollectionParentIcon from '@ussu/common/src/icons/events-collection-parent.svg';
import PinIcon from '@ussu/common/src/icons/events-pin.svg';
import SocietyIcon from '@ussu/common/src/icons/events-society.svg';
import { Link } from 'react-router-dom';
import { generateStylesForBrand, getOrdinal } from '../EventsApplication/utils';
import { getDate } from 'date-fns';
import { ContentCardContent } from '../../components/ContentCard';

function isSameLogicalSleepDay(startDate: Date, endDate: Date): boolean {
  if (isSameDay(startDate, endDate)) {
    return true;
  }

  return isSameDay(addDays(startDate, 1), endDate) && getHours(endDate) < 7;
}

interface IProps {
  event: Event;
}

function renderDates(event: Event) {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const isSpanningEvent = !isSameLogicalSleepDay(startDate, endDate);

  if (isSpanningEvent) {
    return (
      <div>
        <div>
          <li className="EventDetail__details-list-item">
            <CalendarIcon className="EventDetail__icon" />
            {minimalisticTimeRenderer(startDate)},{' '}
            {formatDate(startDate, 'EEEE d')}
            <sup>{getOrdinal(getDate(startDate))}</sup>
            {formatDate(startDate, ' MMMM yyyy')} -{' '}
            {minimalisticTimeRenderer(endDate)}, {formatDate(endDate, 'EEEE d')}
            <sup>{getOrdinal(getDate(endDate))}</sup>
            {formatDate(endDate, ' MMMM yyyy')}
          </li>
        </div>
      </div>
    );
  }

  return (
    <div>
      <li className="EventDetail__details-list-item">
        <CalendarIcon className="EventDetail__icon" />
        {formatDate(startDate, 'EEEE d')}
        <sup>{getOrdinal(getDate(startDate))}</sup>
        {formatDate(startDate, ' MMMM yyyy')}
      </li>
      <li className="EventDetail__details-list-item">
        <ClockIcon className="EventDetail__icon" />
        {`${minimalisticTimeRenderer(startDate)}`}
        <span className="EventDetail__dim">
          {' '}
          – {minimalisticTimeRenderer(endDate)}
        </span>
      </li>
    </div>
  );
}

export const EventDetailDetails = (props: IProps) => {
  const { event } = props;

  return (
    <React.Fragment>
      <ContentCardContent>
        <ul className="List--reset EventDetail__tags">
          {event.brand !== null ? (
            <li className="EventDetail__tag-item">
              <Link
                to={
                  event.brand.overrideListingsRoot !== ''
                    ? event.brand.overrideListingsRoot
                    : `/whats-on/collections/${event.brand.slug}`
                }
                className="EventDetail__tag EventDetail__brand"
                style={generateStylesForBrand(event.brand)}
              >
                {event.brand.name}
              </Link>
            </li>
          ) : null}
          {event.bundle !== null ? (
            <li className="EventDetail__tag-item">
              <Link
                className="EventDetail__bundle EventDetail__tag"
                to={`/whats-on/bundle/${event.bundle.slug}`}
              >
                {event.bundle.name}
              </Link>
            </li>
          ) : null}
        </ul>
        <h2 className="EventDetail__title type-paragon">{event.title}</h2>
        <ul className="EventDetail__details-list">
          {event.parent ? (
            <li className="EventDetail__details-list-item">
              <CollectionParentIcon className="EventDetail__icon" />
              Part of{' '}
              <Link
                to={`/whats-on/${event.parent.slug}-${event.parent.eventId}`}
              >
                {event.parent.title}
              </Link>
            </li>
          ) : null}
          {renderDates(event)}
          {event.locationDisplay === '' && event.venue !== null ? (
            <li className="EventDetail__details-list-item">
              <PinIcon className="EventDetail__icon" />
              {event.venue.name}
            </li>
          ) : null}
          {event.locationDisplay !== '' ? (
            <li className="EventDetail__details-list-item">
              <PinIcon className="EventDetail__icon" />
              {event.locationDisplay}
            </li>
          ) : null}
          {event.studentGroup !== null ? (
            <li className="EventDetail__details-list-item">
              <SocietyIcon className="EventDetail__icon" />
              Organised by{' '}
              <a href={event.studentGroup.link}>{event.studentGroup.name}</a>
            </li>
          ) : null}
          {event.children.length > 0 ? (
            <li className="EventDetail__details-list-item">
              <CollectionIcon className="EventDetail__icon" />
              <a href="#sub-events">{event.children.length} sub-events</a>
            </li>
          ) : null}
        </ul>
      </ContentCardContent>
    </React.Fragment>
  );
};
