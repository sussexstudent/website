import cx from 'classnames';
import React from 'react';
import {
  getSmartDate,
  organisePartsForUI,
  splitEventsInToParts,
} from '../EventsApplication/utils';
import { Event, EventPart } from '@ussu/common/src/types/events';
import EventsCalenderItem from './EventsCalenderItem';
// import VisibilitySensor from 'react-visibility-sensor';

interface EventListingsProps {
  events: any;
  removePast: boolean;
}

// function bucketFill(buckets: number[], count: number) {
//   let countLeft = count;
//   let bucketsUsed = 0;
//   for (let bucket of buckets) {
//     console.log({ bucket, countLeft });
//     if (bucket <= countLeft) {
//       bucketsUsed = bucketsUsed + 1;
//       countLeft = countLeft - bucket;
//     } else {
//       break;
//     }
//   }
//
//   return [bucketsUsed, countLeft];
// }

export const EventListings: React.FC<EventListingsProps> = (props) => {
  const events = props.events.edges.map(({ node }: { node: Event }) => ({
    ...node,
    startDate: new Date(node.startTime),
    endDate: new Date(node.endTime),
  }));
  // let previousDay = null;
  const eventParts = splitEventsInToParts(events, props.removePast);
  const monthGroup = organisePartsForUI(eventParts, props.removePast);
  // chunk by day

  // const [displayLevel, setDisplayLevel] = useState(1);

  // const monthDayCount = monthGroup.map((month) => month.parts.length);

  // const [monthDisplay, dayDisplay] = bucketFill(monthDayCount, displayLevel);

  return (
    <div className="LokiContainer">
      <div className="EventsCalender">
        {monthGroup
          // .slice(0, monthDisplay + 1)
          .map(({ sectionTitle, parts }) => (
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
                        <div
                          className="EventsCalender__part-container"
                          key={index}
                        >
                          <EventsCalenderItem part={part} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        {/*<VisibilitySensor*/}
        {/*  partialVisibility*/}
        {/*  onChange={() => setDisplayLevel((level) => level + 1)}*/}
        {/*>*/}
        {/*  <div*/}
        {/*    style={{*/}
        {/*      display: 'block',*/}
        {/*      background: 'red',*/}
        {/*      width: 1,*/}
        {/*      height: 1000,*/}
        {/*      opacity: 0,*/}
        {/*      position: 'absolute',*/}
        {/*      bottom: 0,*/}
        {/*    }}*/}
        {/*  ></div>*/}
        {/*</VisibilitySensor>*/}
      </div>
    </div>
  );
};
