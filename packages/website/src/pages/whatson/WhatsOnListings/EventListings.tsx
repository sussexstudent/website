import cx from 'classnames';
import React from 'react';
import {
  getSmartDate,
  organisePartsForUI,
  splitEventsInToParts,
  WithHydratedDates,
} from '../utils';
import { EventPart } from '@ussu/common/src/types/events';
import { WhatsOnEventCard } from '../WhatsOnEventCard';
import {
  GetAllEventsWithFilterQuery,
  EventCardFragment,
} from '../../../generated/graphql';

interface EventListingsProps {
  removePast: boolean;
  events: GetAllEventsWithFilterQuery['allEvents']['edges'];
  loading?: boolean;
}

function hydrateWithDates(
  events: GetAllEventsWithFilterQuery['allEvents']['edges'],
): WithHydratedDates<EventCardFragment>[] {
  return events.map(({ node }) => ({
    ...node,
    startDate: new Date(node.startTime),
    endDate: new Date(node.endTime),
  }));
}

export const EventListings: React.FC<EventListingsProps> = ({
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
        .map(({ sectionTitle, parts }) => (
          // sectionTitle might not be unique in the future
          <div className="EventsCalender__section" key={sectionTitle}>
            {parts.map((chunk, index) => (
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
