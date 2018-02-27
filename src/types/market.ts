export enum MarketListingState {
  Draft = 'DRAFT',
  Ready = 'READY',
  Unlisted = 'UNLISTED',
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
}
