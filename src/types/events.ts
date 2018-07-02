import { StudentGroup } from '~components/OrganisationGrid';
import { Connection } from '~types/falmer';

export enum EventPartType {
  Contained,
  SpanStart,
  SpanEnd,
}

export enum TicketType {
  NA = 'NA',
  Native = 'NT',
  MSL = 'MSL',
}

export enum TicketLevel {
  LimitedAvailability = 'LA',
  SoldOut = 'SO',
}

export enum TicketCost {
  Free = 'FREE',
}

export interface ImageLabel {
  confidence: number;
  name: string;
}

export interface FalmerImage {
  // todo place higher
  resource: string;
  title: string;
  labels: Connection<ImageLabel>;
  mediaId: number;
  width: number;
  height: number;
}

export interface Venue {
  websiteLink: null | string;
  name: string;
  venueId: number;
  id: number;
}

export interface Brand {
  accent?: string;
}

export interface MSLEvent {
  lastSync: string;
  disableSync: boolean;
}

export interface Event {
  id: number;
  startTime: string;
  endTime: string;

  startDate: Date;
  endDate: Date;

  title: string;
  kicker: string;
  shortDescription: string;

  venue: null | Venue;
  locationDisplay: string;

  url?: string;
  slug: string;
  eventId: number;
  featuredImage: null | FalmerImage;

  cost: TicketCost;
  ticketLevel: TicketLevel | string; // todo
  ticketType?: TicketType;
  ticketData: string;

  socialFacebook: string;

  bundle: null | {
    name: string;
  };

  studentGroup: null | StudentGroup;

  children: Event[];
  parent: null | Event;

  mslEvent?: MSLEvent;
}

export interface EventPart {
  type: EventPartType;
  eventId: number;
  date: Date;
  event: Event;
}
