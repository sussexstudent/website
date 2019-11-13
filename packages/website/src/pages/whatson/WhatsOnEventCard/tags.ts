import { Event, TicketCost, TicketType } from '@ussu/common/src/types/events';

export enum EventTagType {
  Info,
  Requirement,
  Taste,
}

export interface EventTag {
  title: string;
  type: EventTagType;
  id: string;
}

function createTag(title: string, type: EventTagType): EventTag {
  return { title, type, id: `${type}/${title}` };
}

export function* getTagsForEvent(event: Event) {
  if (event.isOver18Only) {
    yield createTag('18+', EventTagType.Requirement);
  }

  if (event.cost === 'FREE') {
    yield createTag('Free', EventTagType.Info);
  }

  if (
    event.ticketType !== undefined &&
    event.ticketType !== TicketType.NA &&
    event.ticketLevel !== 'SO'
  ) {
    yield createTag(
      event.cost === TicketCost.Free ? 'Ticketed' : 'Ticketed',
      EventTagType.Info,
    );
  }

  if (event.ticketLevel === 'LA') {
    yield createTag('Limited availability', EventTagType.Info);
  }

  if (event.type) {
    yield createTag(event.type.name, EventTagType.Taste);
  }

  if (event.categories && event.categories.length > 0) {
    yield* event.categories
      .slice(0, 2)
      .map((cat) => createTag(cat.name, EventTagType.Taste));
  }
}
