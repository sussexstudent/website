import React from 'react';
import { Event } from '../../types/events';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import getHours from 'date-fns/getHours';
import formatDate from 'date-fns/format';
import minimalisticTimeRenderer from '../../libs/minimalisticTimeRenderer';
import CalendarIcon from '../../icons/events-calender.svg';
import ClockIcon from '../../icons/events-clock.svg';
import CollectionIcon from '../../icons/events-collection.svg';
import CollectionParentIcon from '../../icons/events-collection-parent.svg';
import PinIcon from '../../icons/events-pin.svg';
import SocietyIcon from '../../icons/events-society.svg';
import { Link } from 'react-router-dom';

function isSameLogicalSleepDay(startDate: Date, endDate: Date) {
  if (isSameDay(startDate, endDate)) {
    return true;
  }

  if (isSameDay(addDays(startDate, 1), endDate) && getHours(endDate) < 7) {
    return true;
  }

  return false;
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
            {formatDate(startDate, 'ddd D MMM YYYY')} -{' '}
            {minimalisticTimeRenderer(endDate)},{' '}
            {formatDate(endDate, 'ddd D MMM YYYY')}
          </li>
        </div>
      </div>
    );
  }

  return (
    <div>
      <li className="EventDetail__details-list-item">
        <CalendarIcon className="EventDetail__icon" />
        {formatDate(startDate, 'dddd D MMMM YYYY')}
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
    <div className="EventDetail__details">
      <div className="ContentCard__content">
        <h2 className="EventDetail__title">{event.title}</h2>
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
      </div>
    </div>
  );
};
