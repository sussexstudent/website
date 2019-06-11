import React from 'react';
import { Event, PAValue } from '@ussu/common/src/types/events';

interface EventAccessSidebarProps {
  event: Event;
}

export const EventAccessSidebar: React.FC<EventAccessSidebarProps> = ({
  event,
}) => {
  const hasAnyAudience =
    event.audienceGoodToMeetPeople ||
    event.audienceJustForPgs ||
    event.audienceSuitableKidsFamilies ||
    event.isOver18Only;

  return (
    <div className="EventSidebar">
      {event.type && (
        <div className="EventSidebar__part">
          <h4 className="EventSidebar__heading">Type</h4>
          <div className="EventSidebar__value">{event.type.name}</div>
        </div>
      )}
      {event.categories.length > 0 && (
        <div className="EventSidebar__part">
          <h4 className="EventSidebar__heading">Categories</h4>
          <ul className="EventSidebar__value">
            {event.categories.map((cat) => (
              <li key={cat.slug}>{cat.name}</li>
            ))}
          </ul>
        </div>
      )}
      {hasAnyAudience ? (
        <div className="EventSidebar__part">
          <h4 className="EventSidebar__heading">Audience</h4>
          <ul className="EventSidebar__value">
            {event.audienceGoodToMeetPeople && <li>Good to meet people</li>}
            {event.audienceJustForPgs && <li>Great for PGs</li>}
            {event.audienceSuitableKidsFamilies && (
              <li>Great for Kids and Families</li>
            )}
            {event.isOver18Only && <li>Over 18s only, ID Required</li>}
          </ul>
        </div>
      ) : null}

      <div className="EventSidebar__part">
        <h4 className="EventSidebar__heading">Accessibility</h4>
        <ul className="EventSidebar__value">
          {event.hasAccessibleToilets === PAValue.Positive && (
            <li>Has accessible toilets</li>
          )}
          {event.hasChangingFacilities === PAValue.Positive && (
            <li>Has changing facilities</li>
          )}
          {event.hasGenderNeutralToilets === PAValue.Positive && (
            <li>Has gender neutral toilets</li>
          )}
          {event.hasLevelAccess === PAValue.Positive && (
            <li>Has level access</li>
          )}
          {event.containsFlashingLights === PAValue.Positive && (
            <li>Contains flashing lights</li>
          )}
          {event.containsLoudMusic === PAValue.Positive && (
            <li>Contains loud music</li>
          )}
          {event.containsLowLight === PAValue.Positive && (
            <li>Contains low light</li>
          )}
          {event.containsUnevenGround === PAValue.Positive && (
            <li>Contains uneven ground</li>
          )}
        </ul>
        For access requirements please contact{' '}
        <a href="mailto:access@sussexstudent.com">access@sussexstudent.com</a>
      </div>
    </div>
  );
};
