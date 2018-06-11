import cx from 'classnames';
import React from 'react';
import {
  getSmartDate,
  organisePartsForUI,
  splitEventsInToParts,
} from '~components/EventsApplication/utils';
import { Event, EventPart } from '../../types/events';
import EventsCalenderItem from '~components/EventsCalender/EventsCalenderItem';

interface EventListingsProps {
  events: any;
  removePast: boolean;
}

export function EventListings(props: EventListingsProps) {
  const events = props.events.edges.map(({ node }: { node: Event }) => ({
    ...node,
    startDate: new Date(node.startTime),
    endDate: new Date(node.endTime),
  }));
  // let previousDay = null;
  const eventParts = splitEventsInToParts(events, props.removePast);
  const uiEvents = organisePartsForUI(eventParts, props.removePast);
  // chunk by day

  return (
    <div className="EventsCalender">
      {uiEvents.map(({ sectionTitle, parts }) => (
        // sectionTitle might not be unique in the future
        <div className="EventsCalender__section" key={sectionTitle}>
          <h2 className="EventsCalender__section-title">{sectionTitle}</h2>
          {parts.map((chunk, index) => (
            <div key={index}>
              <h3 className={cx('EventsCalender__item-date-kicker')}>
                {getSmartDate(chunk[0])}
              </h3>
              <div className="EventsCalender__section-items">
                {chunk.map((part: EventPart, index: number) => {
                  return (
                    <div className="EventsCalender__part-container" key={index}>
                      <EventsCalenderItem part={part} />
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
}
