import { Connection } from '@ussu/common/src/types/falmer';
import { ClientAuth } from '@ussu/common/src/libs/user';
import { StudentGroup } from './groups';
import { EventCardFragment } from '@ussu/website/src/generated/graphql';

export enum EventPartType {
  Contained,
  SpanStart,
  SpanEnd,
}

export interface ImageLabel {
  id: string;
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
  name: string;
  slug: string;
  overrideListingsRoot: string;
  accent?: string;
}

export interface Category {
  name: string;
  slug: string;
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
  featuredImage: FalmerImage;

  ticketData: string;

  socialFacebook: string;
  canceledAt: string;

  mslEvent: any;

  userLike: null | {
    source: 'USER' | 'UNLIKED' | 'RECOMMENDATION';
  };

  bundle: null | {
    name: string;
    slug: string;
  };

  brand: null | Brand;

  studentGroup: null | StudentGroup;

  children: Event[];
  parent: Event;

  categories: Category[];

  isOver18Only: boolean;
}

export interface EventPart {
  type: EventPartType;
  eventId: number;
  date: Date;
  event: EventCardFragment;
}

export interface MSLTicket {
  currencySymbol: string;
  ticketName: string;
  maxQuantity: number;
  value: number;
  msl: {
    hidden: string;
    select: string;
    button: string;
  };
}

export interface MSLCommunicationEventData {
  tickets: MSLTicket[];
  pageMenuOptions: false | ClientAuth['menu']['page'];
}
