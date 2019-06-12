import { Connection } from '@ussu/common/src/types/falmer';
import { ClientAuth } from '@ussu/common/src/libs/user';
import { StudentGroup } from './groups';

export enum EventPartType {
  Contained,
  SpanStart,
  SpanEnd,
}

export enum TicketType {
  NA = 'NA',
  Native = 'NT',
  Eventbrite = 'EB',
  ACCA = 'AC',
  Generic = 'GN',
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

export interface MSLEvent {
  lastSync: string;
  disableSync: boolean;
}

export interface Category {
  name: string;
  slug: string;
}

export interface EventType {
  name: string;
  slug: string;
}

export enum PAValue {
  NA = 'A_0',
  Negative = 'A_1',
  Positive = 'A_2',
}
export enum Alcohol {
  Available = 'AV',
  No = 'NO',
  NotFocued = 'NF',
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

  cost: TicketCost;
  ticketLevel: TicketLevel | string; // todo
  ticketType?: TicketType;
  ticketData: string;

  socialFacebook: string;

  bundle: null | {
    name: string;
    slug: string;
  };

  brand: null | Brand;

  studentGroup: null | StudentGroup;

  children: Event[];
  parent: Event;

  mslEvent?: MSLEvent;

  categories: Category[];
  type: EventType;

  isOver18Only: boolean;

  alcohol: Alcohol;

  audienceJustForPgs: boolean;
  audienceSuitableKidsFamilies: boolean;
  audienceGoodToMeetPeople: boolean;

  containsLowLight: PAValue;
  containsLowLightReasoning: string;

  containsFlashingLights: PAValue;
  containsFlashingLightsReasoning: string;

  containsLoudMusic: PAValue;
  containsLoudMusicReasoning: string;

  containsUnevenGround: PAValue;
  containsUnevenGroundReasoning: string;

  hasGenderNeutralToilets: PAValue;
  hasGenderNeutralToiletsReasoning: string;

  hasAccessibleToilets: PAValue;
  hasAccessibleToiletsReasoning: string;

  hasChangingFacilities: PAValue;
  hasChangingFacilitiesReasoning: string;

  hasLevelAccess: PAValue;
  hasLevelAccessReasoning: string;
}

export interface EventPart {
  type: EventPartType;
  eventId: number;
  date: Date;
  event: Event;
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
