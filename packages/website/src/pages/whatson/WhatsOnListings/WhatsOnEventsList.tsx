import cx from 'classnames';
import React from 'react';
import {
  getSmartDate,
  hydrateWithDates,
  organisePartsForUI,
  splitEventsInToParts,
} from '../utils';
import { EventPart } from '@ussu/common/src/types/events';
import { WhatsOnEventCard } from '../WhatsOnEventCard';
import { GetAllEventsWithFilterQuery } from '../../../generated/graphql';
import { Skeleton } from '../../../components/Skeleton';

interface EventListingsProps {
  removePast: boolean;
  events: GetAllEventsWithFilterQuery['allEvents']['edges'];
  loading?: boolean;
}

export const WhatsOnEventsList: React.FC<EventListingsProps> = ({
  removePast,
  events,
  loading,
}) => {
  const eventsWithDates = hydrateWithDates(events);

  const eventParts = splitEventsInToParts(eventsWithDates, removePast);
  const monthGroup = organisePartsForUI(eventParts, removePast);

  return (
    <div
      className={cx('EventsCalender', { 'EventsCalender--loading': loading })}
    >
      {monthGroup
        // .slice(0, monthDisplay + 1)
        .map(({ title, data }) => (
          // sectionTitle might not be unique in the future
          <div className="EventsCalender__section" key={title}>
            {data.map((chunk, index) => (
              <div key={index}>
                <h3 className={cx('EventsCalender__item-date-kicker')}>
                  {getSmartDate(chunk[0])}
                </h3>
                <div className="EventsCalender__section-items">
                  {chunk.map((part: EventPart, index: number) => {
                    return (
                      <div
                        className="EventsCalender__part-container"
                        key={index}
                      >
                        <WhatsOnEventCard event={part.event} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export const WhatsOnEventsListSkeleton = () => {
  return (
    <div className="EventsCalender">
      <div className="EventsCalender__section">
        <div>
          <h3 className="EventsCalender__item-date-kicker">
            <Skeleton template="____ ____" />
          </h3>
          <div className="EventsCalender__section-items">
            <div className="EventsCalender__part-container">
              <WhatsOnEventCard />
            </div>{' '}
            <div className="EventsCalender__part-container">
              <WhatsOnEventCard />
            </div>
          </div>
          <div>
            <h3 className="EventsCalender__item-date-kicker">
              <Skeleton template="____ ___" />
            </h3>
            <div className="EventsCalender__section-items">
              <div className="EventsCalender__part-container">
                <WhatsOnEventCard />
              </div>{' '}
              <div className="EventsCalender__part-container">
                <WhatsOnEventCard />
              </div>{' '}
              <div className="EventsCalender__part-container">
                <WhatsOnEventCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
