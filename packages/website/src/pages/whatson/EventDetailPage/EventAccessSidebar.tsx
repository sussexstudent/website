import React from 'react';
import { EventSidebarSection } from './EventSidebarSection';
import { GetFullEventInfoQuery, PaValues } from '../../../generated/graphql';

interface EventAccessSidebarProps {
  event: GetFullEventInfoQuery['event'];
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
    <div>
      {event.type && (
        <EventSidebarSection heading="Type">
          {event.type.name}
        </EventSidebarSection>
      )}
      {event.categories.length > 0 && (
        <EventSidebarSection heading="Categories">
          <ul className="List List--reset">
            {event.categories.map((cat) => (
              <li key={cat.slug}>{cat.name}</li>
            ))}
          </ul>
        </EventSidebarSection>
      )}
      {hasAnyAudience ? (
        <EventSidebarSection heading="Audience">
          <ul className="List List--reset">
            {event.audienceGoodToMeetPeople && <li>Good to meet people</li>}
            {event.audienceJustForPgs && <li>Great for PGs</li>}
            {event.audienceSuitableKidsFamilies && (
              <li>Great for Kids and Families</li>
            )}
            {event.isOver18Only && <li>Over 18s only, ID Required</li>}
          </ul>
        </EventSidebarSection>
      ) : null}

      <EventSidebarSection heading="Accessibility">
        <ul className="List List--reset">
          {event.hasAccessibleToilets === PaValues.Positive && (
            <li>Has accessible toilets</li>
          )}
          {event.hasChangingFacilities === PaValues.Positive && (
            <li>Has changing facilities</li>
          )}
          {event.hasGenderNeutralToilets === PaValues.Positive && (
            <li>Has gender neutral toilets</li>
          )}
          {event.hasLevelAccess === PaValues.Positive && (
            <li>Has level access</li>
          )}
          {event.containsFlashingLights === PaValues.Positive && (
            <li>Contains flashing lights</li>
          )}
          {event.containsLoudMusic === PaValues.Positive && (
            <li>Contains loud music</li>
          )}
          {event.containsLowLight === PaValues.Positive && (
            <li>Contains low light</li>
          )}
          {event.containsUnevenGround === PaValues.Positive && (
            <li>Contains uneven ground</li>
          )}
        </ul>
        For access requirements please contact{' '}
        <a href="mailto:access@sussexstudent.com">access@sussexstudent.com</a>
      </EventSidebarSection>
    </div>
  );
};
