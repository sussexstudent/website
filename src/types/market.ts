import { FalmerImage } from './events';

export enum MarketListingState {
  Draft = 'DRAFT',
  Ready = 'READY',
  Unlisted = 'UNLISTED',
  Expired = 'EXPIRED',
}

export interface BasicUser {
  name: string;
  id: number;
  userId: number;
}

export interface MarketSection {
  pk: number;
  title: string;
  slug: string;
}

export interface MarketListing {
  pk: number;
  bookTitle: string;
  bookAuthor: string;
  description: string;
  buyPrice: number;
  section: MarketSection;
  state: MarketListingState;
  image: FalmerImage;
  listingUser: BasicUser;
}
