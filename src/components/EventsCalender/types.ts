
export enum TicketType {
  Native = 'NA',
}

export enum TicketLevel {
  LimitedAvailability = 'LA',
  SoldOut = 'SO',
}

export enum TicketCost {
  Free = 'FREE',
}

export interface FalmerImage { // todo place higher
  resource: string;
}

export interface Venue {
  websiteLink: null | string;
  name: string;
}

export interface Event {
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
  ticketType?: TicketType

  bundle: null | {
    name: string;
  }
}
