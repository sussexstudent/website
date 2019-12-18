declare module '*/AllActiveBanners.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getActiveBanners: DocumentNode;

  export default defaultDocument;
}

declare module '*/OffersQuery.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getOffers: DocumentNode;

  export default defaultDocument;
}

declare module '*/ActiveSlate.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getActiveSlate: DocumentNode;

  export default defaultDocument;
}

declare module '*/StudentGroupListings.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getAllStudentGroups: DocumentNode;
  export const StudentGroupFragment: DocumentNode;

  export default defaultDocument;
}

declare module '*/AllAwards.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getAwardsForGroupBySlug: DocumentNode;
  export const award: DocumentNode;
  export const awardAuthority: DocumentNode;
  export const awarded: DocumentNode;
  export const awardsPeriod: DocumentNode;

  export default defaultDocument;
}

declare module '*/Flags.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getActiveFlags: DocumentNode;

  export default defaultDocument;
}

declare module '*/acceptConsent.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const AcceptConsent: DocumentNode;

  export default defaultDocument;
}

declare module '*/ChangeState.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ChangeState: DocumentNode;

  export default defaultDocument;
}

declare module '*/GetListing.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getMarketListing: DocumentNode;

  export default defaultDocument;
}

declare module '*/RequestContactDetails.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RequestMarketListingContactDetails: DocumentNode;

  export default defaultDocument;
}

declare module '*/UpdateImage.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UpdateListingImage: DocumentNode;

  export default defaultDocument;
}

declare module '*/CreateListingMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateListing: DocumentNode;

  export default defaultDocument;
}

declare module '*/CurrentUser.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getViewer: DocumentNode;

  export default defaultDocument;
}

declare module '*/MyListings.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getViewerMarketListing: DocumentNode;

  export default defaultDocument;
}

declare module '*/GetSearch.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const searchMarketListings: DocumentNode;

  export default defaultDocument;
}

declare module '*/SectionListings.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getListingsForSection: DocumentNode;

  export default defaultDocument;
}

declare module '*/getAllMarketSections.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getAllMarketSections: DocumentNode;

  export default defaultDocument;
}

declare module '*/marketListingFragment.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const marketListing: DocumentNode;

  export default defaultDocument;
}

declare module '*/ContentPageQuery.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getContentByPath: DocumentNode;
  export const ContentPageGenerals: DocumentNode;
  export const ContentPageGeneralsGeneric: DocumentNode;
  export const FalmerImage: DocumentNode;
  export const KBTypes: DocumentNode;

  export default defaultDocument;
}

declare module '*/FreshersMenuQuery.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const FreshersMenuQuery: DocumentNode;

  export default defaultDocument;
}

declare module '*/EventsDetailPage.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getFullEventInfo: DocumentNode;
  export const EventCard: DocumentNode;
  export const userLike: DocumentNode;

  export default defaultDocument;
}

declare module '*/LiveBrandingPeriods.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getLiveBrandingPeriods: DocumentNode;

  export default defaultDocument;
}

declare module '*/BrandingPeriod.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getBrandingPeriod: DocumentNode;

  export default defaultDocument;
}

declare module '*/EventListingFragment.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const EventListingFragment: DocumentNode;

  export default defaultDocument;
}

declare module '*/EventListings.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getAllEventsWithFilter: DocumentNode;

  export default defaultDocument;
}

declare module '*/EventListingsBrandingPeriod.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const EventListingsBrandingPeriod: DocumentNode;

  export default defaultDocument;
}

declare module '*/EventListingsBundle.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getEventsByBundleSlug: DocumentNode;

  export default defaultDocument;
}

declare module '*/LikeEvent.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const likeEvent: DocumentNode;

  export default defaultDocument;
}

declare module '*/MyProgramme.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getUserLikedEvents: DocumentNode;

  export default defaultDocument;
}

declare module '*/getConsentForm.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getConsentFormBySlug: DocumentNode;

  export default defaultDocument;
}
