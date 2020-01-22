/* eslint-disable */
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  GenericStreamFieldType: any;
  RichTextFieldType: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type AcceptConsentForm = {
  __typename: 'AcceptConsentForm';
  authorisation: Maybe<ConsentCodeAuthorisation>;
};

export type AllPages =
  | StaffPage
  | StaffMemberSnippet
  | SectionContentPage
  | SelectionGridPage
  | OfficerOverviewPage
  | OfficersIndex
  | OfficerEventsPage
  | HomePage
  | KbRootPage
  | KbCategoryPage
  | AnswerPage
  | ReferencePage
  | DetailedGuidePage
  | DetailedGuideSectionPage
  | StubPage
  | BasicContentPage
  | OutletIndexPage
  | OutletPage
  | SchemeIndexPage
  | SchemePage
  | FreshersHomepage
  | ClickThrough;

export type AnswerPage = Page & {
  __typename: 'AnswerPage';
  relatedLinks: Scalars['GenericStreamFieldType'];
  staffOwners: Scalars['GenericStreamFieldType'];
  content: Maybe<Scalars['GenericStreamFieldType']>;
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type AnswerPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type AnswerPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type AnswerPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type AnswerPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type AnswerPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type AnswerPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type AnswerPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type Award = {
  __typename: 'Award';
  id: Scalars['ID'];
  authority: AwardAuthority;
  name: Scalars['String'];
  description: Scalars['String'];
  slug: Scalars['String'];
  link: Scalars['String'];
  icon: AwardIcon;
  groupawardedSet: Array<AwardAwarded>;
};

export type AwardAuthority = {
  __typename: 'AwardAuthority';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type AwardAwarded = {
  __typename: 'AwardAwarded';
  id: Scalars['ID'];
  group: StudentGroup;
  award: Award;
  period: AwardPeriod;
  grade: Scalars['Int'];
};

/** An enumeration. */
export enum AwardIcon {
  /** LeafCommunity */
  Community = 'COMMUNITY',
  /** LeafDevelopment */
  Development = 'DEVELOPMENT',
  /** LeafSocial */
  Social = 'SOCIAL',
  /** LeafStudentVoice */
  StudentVoice = 'STUDENT_VOICE',
  /** LeafTeamSussex */
  TeamSussex = 'TEAM_SUSSEX',
  /** LeafCommunications */
  Communications = 'COMMUNICATIONS',
  /** LeafFundraising */
  Fundraising = 'FUNDRAISING',
  /** LeafInclusivity */
  Inclusivity = 'INCLUSIVITY',
}

export type AwardPeriod = {
  __typename: 'AwardPeriod';
  id: Scalars['ID'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  authority: AwardAuthority;
  displayName: Scalars['String'];
  awarded: Array<AwardAwarded>;
};

export type Banner = {
  __typename: 'Banner';
  id: Scalars['ID'];
  outlet: Scalars['String'];
  displayFrom: Maybe<Scalars['DateTime']>;
  displayTo: Maybe<Scalars['DateTime']>;
  purpose: BannerPurpose;
  heading: Scalars['String'];
  body: Scalars['RichTextFieldType'];
};

/** An enumeration. */
export enum BannerPurpose {
  /** Notice */
  Notice = 'NOTICE',
}

export type BasicContentPage = Page & {
  __typename: 'BasicContentPage';
  content: Maybe<Scalars['GenericStreamFieldType']>;
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type BasicContentPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type BasicContentPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type BasicContentPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type BasicContentPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type BasicContentPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type BasicContentPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type BasicContentPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type BrandingPeriod = {
  __typename: 'BrandingPeriod';
  id: Scalars['ID'];
  name: Scalars['String'];
  websiteLink: Scalars['String'];
  slug: Scalars['String'];
  accent: Scalars['String'];
  description: Scalars['RichTextFieldType'];
  eventAppend: Scalars['RichTextFieldType'];
  logo: Maybe<Image>;
  logoVector: Maybe<File>;
  displayFrom: Maybe<Scalars['DateTime']>;
  overrideListingsRoot: Scalars['String'];
  events: EventConnection;
  bundleSet: Array<Bundle>;
};

export type BrandingPeriodEventsArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type Bundle = {
  __typename: 'Bundle';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  ticketLevel: BundleTicketLevel;
  ticketType: BundleTicketType;
  ticketData: Scalars['String'];
  price: Maybe<Scalars['Float']>;
  brand: Maybe<BrandingPeriod>;
  eventSet: EventConnection;
};

export type BundleEventSetArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum BundleTicketLevel {
  /** Not applicable */
  Na = 'NA',
  /** Limited availability */
  La = 'LA',
  /** Sold out */
  So = 'SO',
}

/** An enumeration. */
export enum BundleTicketType {
  /** n/a */
  Na = 'NA',
  /** Native */
  Nt = 'NT',
  /** Eventbrite */
  Eb = 'EB',
  /** ACCA */
  Ac = 'AC',
  /** Generic */
  Gn = 'GN',
  /** MSL */
  Msl = 'MSL',
}

export type CategoryNode = {
  __typename: 'CategoryNode';
  id: Scalars['ID'];
  path: Scalars['String'];
  depth: Scalars['Int'];
  numchild: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  eventSet: EventConnection;
  parent: Maybe<CategoryNode>;
};

export type CategoryNodeEventSetArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type ClickThrough = Page & {
  __typename: 'ClickThrough';
  id: Scalars['ID'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type ClickThroughSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ClickThroughSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ClickThroughSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ClickThroughAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ClickThroughAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ClickThroughClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type ClickThroughClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type ClientUser = {
  __typename: 'ClientUser';
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  hasCmsAccess: Maybe<Scalars['Boolean']>;
  userId: Maybe<Scalars['Int']>;
  permissions: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type ConsentCodeAuthorisation = {
  __typename: 'ConsentCodeAuthorisation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: ClientUser;
  form: ConsentCodeForm;
  code: Scalars['String'];
  additionalData: Scalars['JSONString'];
};

export type ConsentCodeForm = {
  __typename: 'ConsentCodeForm';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  body: Scalars['String'];
  hashCode: Scalars['String'];
  additionalData: Scalars['JSONString'];
  consentcodeauthorisationSet: Array<ConsentCodeAuthorisation>;
};

export type CreateMarketListing = {
  __typename: 'CreateMarketListing';
  ok: Maybe<Scalars['Boolean']>;
  listing: Maybe<MarketListing>;
};

export type Curator = {
  __typename: 'Curator';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  eventSet: EventConnection;
  officereventspageSet: Array<OfficerEventsPage>;
};

export type CuratorEventSetArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type DetailedGuidePage = Page & {
  __typename: 'DetailedGuidePage';
  relatedLinks: Scalars['GenericStreamFieldType'];
  staffOwners: Scalars['GenericStreamFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type DetailedGuidePageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuidePageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuidePageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuidePageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuidePageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuidePageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type DetailedGuidePageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type DetailedGuideSectionPage = Page & {
  __typename: 'DetailedGuideSectionPage';
  content: Maybe<Scalars['GenericStreamFieldType']>;
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type DetailedGuideSectionPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuideSectionPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuideSectionPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuideSectionPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuideSectionPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type DetailedGuideSectionPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type DetailedGuideSectionPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type Event = Node & {
  __typename: 'Event';
  containsLowLight: PaValues;
  containsLowLightReasoning: Scalars['String'];
  containsFlashingLights: PaValues;
  containsFlashingLightsReasoning: Scalars['String'];
  containsLoudMusic: PaValues;
  containsLoudMusicReasoning: Scalars['String'];
  hasGenderNeutralToilets: PaValues;
  hasGenderNeutralToiletsReasoning: Scalars['String'];
  hasAccessibleToilets: PaValues;
  hasAccessibleToiletsReasoning: Scalars['String'];
  hasChangingFacilities: PaValues;
  hasChangingFacilitiesReasoning: Scalars['String'];
  containsUnevenGround: PaValues;
  containsUnevenGroundReasoning: Scalars['String'];
  hasLevelAccess: PaValues;
  hasLevelAccessReasoning: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  parent: Maybe<Event>;
  title: Scalars['String'];
  slug: Scalars['String'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  canceledAt: Maybe<Scalars['DateTime']>;
  featuredImage: Maybe<Image>;
  url: Scalars['String'];
  socialFacebook: Scalars['String'];
  kicker: Scalars['String'];
  locationDisplay: Scalars['String'];
  embargoUntil: Maybe<Scalars['DateTime']>;
  venue: Maybe<Venue>;
  shortDescription: Scalars['String'];
  body: Scalars['RichTextFieldType'];
  studentGroup: Maybe<StudentGroup>;
  isOver18Only: Scalars['Boolean'];
  cost: EventCost;
  alcohol: EventAlcohol;
  ticketLevel: EventTicketLevel;
  ticketType: EventTicketType;
  ticketData: Scalars['String'];
  audienceSuitableKidsFamilies: Scalars['Boolean'];
  audienceJustForPgs: Scalars['Boolean'];
  audienceGoodToMeetPeople: Scalars['Boolean'];
  bundle: Maybe<Bundle>;
  brand: Maybe<BrandingPeriod>;
  category: Array<CategoryNode>;
  type: Maybe<Type>;
  curatedBy: Array<Curator>;
  likes: Array<ClientUser>;
  children: Array<Event>;
  mslevent: Maybe<MslEvent>;
  eventlikeSet: Array<EventLike>;
  categories: Array<CategoryNode>;
  bodyHtml: Scalars['String'];
  eventId: Scalars['Int'];
  mslEventId: Maybe<Scalars['Int']>;
  mslEvent: Maybe<MslEvent>;
  userLike: Maybe<EventLike>;
};

export enum EventAlcohol {
  SoftDrinksAlcohol = 'SOFT_DRINKS_ALCOHOL',
  NoAlcohol = 'NO_ALCOHOL',
  NotAlcoholFocused = 'NOT_ALCOHOL_FOCUSED',
}

export type EventConnection = {
  __typename: 'EventConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EventEdge>>;
};

export type EventConnectionExt = {
  __typename: 'EventConnectionExt';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<EventEdgeX>;
  totalCount: Maybe<Scalars['Int']>;
};

export enum EventCost {
  Free = 'FREE',
  Paid = 'PAID',
  Na = 'NA',
}

/** A Relay edge containing a `Event` and its cursor. */
export type EventEdge = {
  __typename: 'EventEdge';
  /** The item at the end of the edge */
  node: Maybe<Event>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type EventEdgeX = {
  __typename: 'EventEdgeX';
  node: Event;
  cursor: Scalars['String'];
};

export type EventFilterInput = {
  title: Maybe<Scalars['String']>;
  venue: Maybe<Scalars['ID']>;
  type: Maybe<Scalars['ID']>;
  bundle: Maybe<Scalars['String']>;
  parent: Maybe<Scalars['ID']>;
  brand: Maybe<Scalars['String']>;
  studentGroup: Maybe<Scalars['ID']>;
  fromTime: Maybe<Scalars['DateTime']>;
  toTime: Maybe<Scalars['DateTime']>;
  audienceJustForPgs: Maybe<Scalars['Boolean']>;
  audienceSuitableKidsFamilies: Maybe<Scalars['Boolean']>;
  audienceGoodToMeetPeople: Maybe<Scalars['Boolean']>;
  isOver18Only: Maybe<Scalars['Boolean']>;
  cost: Maybe<Scalars['String']>;
  alcohol: Maybe<Scalars['String']>;
  ticketLevel: Maybe<Scalars['String']>;
  curatedBy: Maybe<Scalars['ID']>;
  uncurated: Maybe<Scalars['Boolean']>;
};

export type EventLike = {
  __typename: 'EventLike';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  event: Event;
  user: ClientUser;
  source: EventLikeSource;
  initialSource: EventLikeInitialSource;
  sourceLocation: EventLikeSourceLocation;
};

/** An enumeration. */
export enum EventLikeInitialSource {
  /** User */
  User = 'USER',
  /** Unliked */
  Unliked = 'UNLIKED',
  /** Recommendation */
  Recommendation = 'RECOMMENDATION',
}

/** An enumeration. */
export enum EventLikeSource {
  /** User */
  User = 'USER',
  /** Unliked */
  Unliked = 'UNLIKED',
  /** Recommendation */
  Recommendation = 'RECOMMENDATION',
}

/** An enumeration. */
export enum EventLikeSourceLocation {
  /** Listings */
  Listings = 'LISTINGS',
  /** Collection */
  Collection = 'COLLECTION',
  /** Matcher */
  Matcher = 'MATCHER',
}

export enum EventTicketLevel {
  Na = 'NA',
  LimitedAvailability = 'LIMITED_AVAILABILITY',
  SoldOut = 'SOLD_OUT',
}

export enum EventTicketType {
  Na = 'NA',
  Native = 'NATIVE',
  Eventbrite = 'EVENTBRITE',
  Acca = 'ACCA',
  Generic = 'GENERIC',
  Msl = 'MSL',
}

export type FalmerFile = {
  __typename: 'FalmerFile';
  url: Maybe<Scalars['String']>;
};

export type File = {
  __typename: 'File';
  resource: Maybe<Scalars['String']>;
};

export type Flag = {
  __typename: 'Flag';
  id: Scalars['ID'];
  name: Scalars['String'];
  state: Scalars['Boolean'];
  mode: FlagMode;
  expired: Scalars['Boolean'];
};

/** An enumeration. */
export enum FlagMode {
  /** Force */
  Force = 'FORCE',
}

export type FreshersHomepage = Page & {
  __typename: 'FreshersHomepage';
  countdownCaption: Scalars['String'];
  countdownTarget: Maybe<Scalars['DateTime']>;
  heroText: Scalars['RichTextFieldType'];
  content: Maybe<Scalars['GenericStreamFieldType']>;
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type FreshersHomepageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type FreshersHomepageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type FreshersHomepageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type FreshersHomepageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type FreshersHomepageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type FreshersHomepageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type FreshersHomepageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type GenericPage = Page & {
  __typename: 'GenericPage';
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type GenericPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type GenericPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type GenericPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type GenericPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type GenericPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type GenericPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type GenericPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type HomePage = Page & {
  __typename: 'HomePage';
  fullTimeOfficers: Scalars['GenericStreamFieldType'];
  partTimeOfficers: Scalars['GenericStreamFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type HomePageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type HomePageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type HomePageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type HomePageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type HomePageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type HomePageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type HomePageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type Image = Node & {
  __typename: 'Image';
  width: Scalars['Int'];
  height: Scalars['Int'];
  /** The ID of the object. */
  id: Scalars['ID'];
  resource: Scalars['String'];
  mediaId: Scalars['Int'];
};

export type ImageConnection = {
  __typename: 'ImageConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ImageEdge>>;
};

export type ImageConnectionExt = {
  __typename: 'ImageConnectionExt';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<ImageEdgeX>;
  totalCount: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `Image` and its cursor. */
export type ImageEdge = {
  __typename: 'ImageEdge';
  /** The item at the end of the edge */
  node: Maybe<Image>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ImageEdgeX = {
  __typename: 'ImageEdgeX';
  node: Image;
  cursor: Scalars['String'];
};

export type KbArticle = {
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type KbArticleSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbArticleSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbArticleSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbArticleAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbArticleAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbArticleClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbArticleClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbCategoryPage = Page & {
  __typename: 'KBCategoryPage';
  pageIcon: Maybe<FalmerFile>;
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type KbCategoryPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbCategoryPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbCategoryPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbCategoryPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbCategoryPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbCategoryPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbCategoryPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbReference = {
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
  main: Maybe<Scalars['GenericScalar']>;
  topic: Maybe<KbTopic>;
};

export type KbReferenceSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbReferenceSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbReferenceSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbReferenceAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbReferenceAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbReferenceClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbReferenceClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbRootPage = Page & {
  __typename: 'KBRootPage';
  introduction: Scalars['RichTextFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type KbRootPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbRootPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbRootPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbRootPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbRootPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbRootPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbRootPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbSection = {
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
  topics: Maybe<Array<Maybe<KbTopic>>>;
};

export type KbSectionSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbSectionSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbSectionSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbSectionAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbSectionAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbSectionClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbSectionClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbTopic = {
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
  articles: Maybe<Array<Maybe<KbArticle>>>;
  section: Maybe<KbSection>;
};

export type KbTopicSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbTopicSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbTopicSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbTopicAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbTopicAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KbTopicClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KbTopicClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KnowledgeBase = {
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
  sections: Maybe<Array<Maybe<KbSection>>>;
  section: Maybe<KbSection>;
  article: Maybe<KbReference>;
};

export type KnowledgeBaseSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KnowledgeBaseSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KnowledgeBaseSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KnowledgeBaseAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KnowledgeBaseAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type KnowledgeBaseClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KnowledgeBaseClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type KnowledgeBaseSectionArgs = {
  slug: Maybe<Scalars['String']>;
};

export type KnowledgeBaseArticleArgs = {
  path: Maybe<Scalars['String']>;
};

export type LikeEvent = {
  __typename: 'LikeEvent';
  ok: Maybe<Scalars['Boolean']>;
  event: Maybe<Event>;
};

export type MarketListing = Node & {
  __typename: 'MarketListing';
  /** The ID of the object. */
  id: Scalars['ID'];
  bookTitle: Scalars['String'];
  bookAuthor: Scalars['String'];
  description: Scalars['String'];
  listingUser: PublicUser;
  section: MarketListingSection;
  buyPrice: Scalars['Float'];
  state: MarketListingState;
  contactDetails: Maybe<Scalars['String']>;
  listedAt: Maybe<Scalars['DateTime']>;
  images: ImageConnection;
  pk: Scalars['Int'];
  image: Maybe<Image>;
};

export type MarketListingImagesArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type MarketListingConnectionExt = {
  __typename: 'MarketListingConnectionExt';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<MarketListingEdgeX>;
  totalCount: Maybe<Scalars['Int']>;
};

export type MarketListingEdgeX = {
  __typename: 'MarketListingEdgeX';
  node: MarketListing;
  cursor: Scalars['String'];
};

export type MarketListingInput = {
  bookTitle: Scalars['String'];
  bookAuthor: Scalars['String'];
  description: Scalars['String'];
  contactDetails: Scalars['String'];
  price: Scalars['Float'];
  sectionId: Scalars['Int'];
};

export type MarketListingSection = {
  __typename: 'MarketListingSection';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  pk: Scalars['Int'];
};

export type MarketListingsFilter = {
  q: Maybe<Scalars['String']>;
  section: Maybe<Scalars['String']>;
  own: Maybe<Scalars['Boolean']>;
  sortBy: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum MarketListingState {
  Draft = 'DRAFT',
  Ready = 'READY',
  Unlisted = 'UNLISTED',
  Expired = 'EXPIRED',
}

export type MarketListingUpdateInput = {
  bookTitle: Maybe<Scalars['String']>;
  bookAuthor: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  contactDetails: Maybe<Scalars['String']>;
  price: Maybe<Scalars['Float']>;
  sectionId: Maybe<Scalars['Int']>;
  state: Maybe<Scalars['String']>;
  imageId: Maybe<Scalars['Int']>;
};

export type MoveEvent = {
  __typename: 'MoveEvent';
  ok: Maybe<Scalars['Boolean']>;
  event: Maybe<Event>;
};

export type MslEvent = Node & {
  __typename: 'MSLEvent';
  event: Event;
  disableSync: Scalars['Boolean'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  lastSync: Scalars['DateTime'];
  hasTickets: Scalars['Boolean'];
  orgId: Scalars['String'];
  orgName: Scalars['String'];
  title: Scalars['String'];
  imageUrl: Scalars['String'];
  url: Scalars['String'];
  location: Scalars['String'];
  mslEventId: Scalars['Int'];
  bodyHtml: Scalars['String'];
  description: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type MslNewsResult = {
  __typename: 'MSLNewsResult';
  uuid: Maybe<Scalars['String']>;
  link: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
};

export type MslPageResult = {
  __typename: 'MSLPageResult';
  uuid: Maybe<Scalars['String']>;
  link: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
};

export type MslStudentGroup = {
  __typename: 'MSLStudentGroup';
  id: Scalars['ID'];
  group: StudentGroup;
  description: Scalars['String'];
  mslGroupId: Scalars['Int'];
  logo: Maybe<Image>;
  link: Scalars['String'];
  category: Maybe<MslStudentGroupCategory>;
};

export type MslStudentGroupCategory = {
  __typename: 'MSLStudentGroupCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutations = {
  __typename: 'Mutations';
  createMarketListing: Maybe<CreateMarketListing>;
  updateMarketListing: Maybe<UpdateMarketListing>;
  requestMarketListingContactDetails: Maybe<RequestDetails>;
  acceptConsent: Maybe<AcceptConsentForm>;
  updateSlate: Maybe<UpdateSlate>;
  moveEvent: Maybe<MoveEvent>;
  likeEvent: Maybe<LikeEvent>;
};

export type MutationsCreateMarketListingArgs = {
  listingData: MarketListingInput;
};

export type MutationsUpdateMarketListingArgs = {
  listingData: MarketListingUpdateInput;
  listingId: Maybe<Scalars['Int']>;
};

export type MutationsRequestMarketListingContactDetailsArgs = {
  listingId: Maybe<Scalars['Int']>;
};

export type MutationsAcceptConsentArgs = {
  slug: Maybe<Scalars['String']>;
};

export type MutationsUpdateSlateArgs = {
  data: SlateInput;
  slateId: Scalars['Int'];
};

export type MutationsMoveEventArgs = {
  destinationEventId: Maybe<Scalars['Int']>;
  eventId: Maybe<Scalars['Int']>;
};

export type MutationsLikeEventArgs = {
  eventId: Maybe<Scalars['Int']>;
  likeType: Maybe<Scalars['String']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type Offer = Node & {
  __typename: 'Offer';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Display name of the company offering the deal */
  companyName: Scalars['String'];
  /** Companies logo displayed next to the offer */
  companyLogo: Maybe<Image>;
  companyWebsite: Scalars['String'];
  /** The deal itself, "40%", "By one get one free", etc */
  dealTag: Scalars['String'];
  isFeatured: Scalars['Boolean'];
  main: Maybe<Scalars['GenericScalar']>;
};

export type OfficerEventsPage = Page & {
  __typename: 'OfficerEventsPage';
  description: Scalars['RichTextFieldType'];
  curator: Maybe<Curator>;
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type OfficerEventsPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerEventsPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerEventsPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerEventsPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerEventsPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerEventsPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OfficerEventsPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OfficerOverviewPage = Page & {
  __typename: 'OfficerOverviewPage';
  role: Scalars['String'];
  roleDescription: Scalars['RichTextFieldType'];
  officerImage: Maybe<Image>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  youtubeSplash: Scalars['String'];
  twitterUsername: Scalars['String'];
  facebookUrl: Scalars['String'];
  instagramUrl: Scalars['String'];
  pledges: Scalars['GenericStreamFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type OfficerOverviewPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerOverviewPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerOverviewPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerOverviewPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerOverviewPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficerOverviewPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OfficerOverviewPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OfficersIndex = Page & {
  __typename: 'OfficersIndex';
  id: Scalars['ID'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type OfficersIndexSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficersIndexSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficersIndexSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficersIndexAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficersIndexAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OfficersIndexClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OfficersIndexClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OutletIndexPage = Page & {
  __typename: 'OutletIndexPage';
  preamble: Scalars['GenericStreamFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type OutletIndexPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletIndexPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletIndexPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletIndexPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletIndexPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletIndexPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OutletIndexPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OutletPage = Page & {
  __typename: 'OutletPage';
  main: Maybe<Scalars['GenericStreamFieldType']>;
  heroImage: Image;
  openingTimes: Scalars['GenericStreamFieldType'];
  menu: Scalars['GenericStreamFieldType'];
  deals: Scalars['GenericStreamFieldType'];
  /** Link this outlet with a venue's events */
  linkedVenue: Maybe<Venue>;
  googleMapsPlaceId: Scalars['String'];
  contactDetails: Scalars['RichTextFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type OutletPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type OutletPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type OutletPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type Page = {
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type PageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type PageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type PageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type PageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type PageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type PageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type PageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>;
};

export type PageResult = {
  __typename: 'PageResult';
  contentType: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  seoTitle: Maybe<Scalars['String']>;
  searchDescription: Maybe<Scalars['String']>;
  lastPublishedAt: Maybe<Scalars['DateTime']>;
  urlPath: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  data: Maybe<Scalars['GenericScalar']>;
  id: Maybe<Scalars['Int']>;
};

export enum PaValues {
  Na = 'NA',
  Negative = 'NEGATIVE',
  Positive = 'POSITIVE',
}

export type Permission = {
  __typename: 'Permission';
  contentType: Maybe<Scalars['String']>;
};

export type PublicUser = {
  __typename: 'PublicUser';
  id: Scalars['ID'];
  name: Scalars['String'];
  userId: Scalars['Int'];
};

export type Queries = {
  __typename: 'Queries';
  allMarketListings: MarketListingConnectionExt;
  allMarketSections: Array<MarketListingSection>;
  marketListing: Maybe<MarketListing>;
  marketSection: Maybe<MarketListingSection>;
  allFlags: Array<Flag>;
  consentForm: Maybe<ConsentCodeForm>;
  knowledgeBase: Maybe<KnowledgeBase>;
  viewer: Maybe<ClientUser>;
  permissions: Maybe<Array<Maybe<Permission>>>;
  page: Maybe<Page>;
  allPages: Maybe<Array<Maybe<Page>>>;
  allImages: ImageConnectionExt;
  image: Maybe<Image>;
  allOffers: Array<Offer>;
  allActiveBanners: Array<Banner>;
  search: Maybe<SearchQuery>;
  events: Maybe<Array<Maybe<Event>>>;
  content: Maybe<Array<Maybe<PageResult>>>;
  groups: Maybe<Array<Maybe<StudentGroup>>>;
  news: Maybe<Array<Maybe<MslNewsResult>>>;
  pages: Maybe<Array<Maybe<MslPageResult>>>;
  top: Maybe<Array<Maybe<Scalars['String']>>>;
  activeSlate: Slate;
  slate: Slate;
  allSlates: SlateConnectionExt;
  allEvents: EventConnectionExt;
  allVenues: VenueConnectionExt;
  allBrandingPeriods: Array<BrandingPeriod>;
  event: Event;
  brandingPeriod: BrandingPeriod;
  bundle: Bundle;
  allGroups: StudentGroupConnectionExt;
  group: Maybe<StudentGroup>;
};

export type QueriesAllMarketListingsArgs = {
  filters: Maybe<MarketListingsFilter>;
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueriesMarketListingArgs = {
  listingId: Scalars['Int'];
};

export type QueriesMarketSectionArgs = {
  slug: Scalars['String'];
};

export type QueriesConsentFormArgs = {
  slug: Maybe<Scalars['String']>;
};

export type QueriesPageArgs = {
  path: Maybe<Scalars['String']>;
  previewToken: Maybe<Scalars['String']>;
};

export type QueriesAllPagesArgs = {
  path: Maybe<Scalars['String']>;
};

export type QueriesAllImagesArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueriesImageArgs = {
  mediaId: Maybe<Scalars['Int']>;
};

export type QueriesSearchArgs = {
  query: Maybe<Scalars['String']>;
};

export type QueriesSlateArgs = {
  slateId: Scalars['Int'];
};

export type QueriesAllSlatesArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueriesAllEventsArgs = {
  brand: Maybe<Scalars['String']>;
  skipEmbargo: Maybe<Scalars['Boolean']>;
  viewerLiked: Maybe<Scalars['Boolean']>;
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  filter: Maybe<EventFilterInput>;
};

export type QueriesAllVenuesArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueriesEventArgs = {
  eventId: Maybe<Scalars['Int']>;
  mslEventId: Maybe<Scalars['Int']>;
};

export type QueriesBrandingPeriodArgs = {
  slug: Scalars['String'];
};

export type QueriesBundleArgs = {
  slug: Scalars['String'];
};

export type QueriesAllGroupsArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type QueriesGroupArgs = {
  groupId: Maybe<Scalars['Int']>;
  groupSlug: Maybe<Scalars['String']>;
};

export type ReferencePage = Page & {
  __typename: 'ReferencePage';
  relatedLinks: Scalars['GenericStreamFieldType'];
  staffOwners: Scalars['GenericStreamFieldType'];
  content: Maybe<Scalars['GenericStreamFieldType']>;
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type ReferencePageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ReferencePageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ReferencePageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ReferencePageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ReferencePageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type ReferencePageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type ReferencePageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type RequestDetails = {
  __typename: 'RequestDetails';
  listing: Maybe<MarketListing>;
};

export type SchemeIndexPage = Page & {
  __typename: 'SchemeIndexPage';
  id: Scalars['ID'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type SchemeIndexPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemeIndexPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemeIndexPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemeIndexPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemeIndexPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemeIndexPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type SchemeIndexPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type SchemePage = Page & {
  __typename: 'SchemePage';
  id: Scalars['ID'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type SchemePageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemePageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemePageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemePageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemePageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SchemePageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type SchemePageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type SearchQuery = {
  __typename: 'SearchQuery';
  events: Maybe<Array<Maybe<Event>>>;
  content: Maybe<Array<Maybe<PageResult>>>;
  groups: Maybe<Array<Maybe<StudentGroup>>>;
  news: Maybe<Array<Maybe<MslNewsResult>>>;
  pages: Maybe<Array<Maybe<MslPageResult>>>;
  top: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SectionContentPage = Page & {
  __typename: 'SectionContentPage';
  body: Scalars['GenericStreamFieldType'];
  contentsInSidebar: Scalars['Boolean'];
  headingImage: Maybe<Image>;
  headingImageAsHero: Scalars['Boolean'];
  sidebarBody: Scalars['GenericStreamFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type SectionContentPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SectionContentPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SectionContentPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SectionContentPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SectionContentPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SectionContentPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type SectionContentPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type SelectionGridPage = Page & {
  __typename: 'SelectionGridPage';
  body: Scalars['GenericStreamFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type SelectionGridPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SelectionGridPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SelectionGridPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SelectionGridPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SelectionGridPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type SelectionGridPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type SelectionGridPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type Slate = Node & {
  __typename: 'Slate';
  /** The ID of the object. */
  id: Scalars['ID'];
  displayFrom: Scalars['DateTime'];
  data: Maybe<Scalars['GenericScalar']>;
  notes: Scalars['String'];
  enhancedData: Maybe<Scalars['GenericScalar']>;
  slateId: Maybe<Scalars['Int']>;
};

export type SlateConnectionExt = {
  __typename: 'SlateConnectionExt';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<SlateEdgeX>;
  totalCount: Maybe<Scalars['Int']>;
};

export type SlateEdgeX = {
  __typename: 'SlateEdgeX';
  node: Slate;
  cursor: Scalars['String'];
};

export type SlateInput = {
  data: Scalars['GenericScalar'];
};

export type StaffMemberSnippet = Page & {
  __typename: 'StaffMemberSnippet';
  photo: Maybe<Image>;
  name: Scalars['String'];
  jobTitle: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  officePhoneNumber: Maybe<Scalars['String']>;
  mobilePhoneNumber: Maybe<Scalars['String']>;
  jobDescription: Scalars['RichTextFieldType'];
  officeLocation: Maybe<Scalars['String']>;
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type StaffMemberSnippetSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffMemberSnippetSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffMemberSnippetSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffMemberSnippetAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffMemberSnippetAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffMemberSnippetClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type StaffMemberSnippetClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type StaffPage = Page & {
  __typename: 'StaffPage';
  body: Scalars['GenericStreamFieldType'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type StaffPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StaffPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type StaffPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type StubPage = Page & {
  __typename: 'StubPage';
  id: Scalars['ID'];
  contentType: Scalars['String'];
  title: Scalars['String'];
  slug: Scalars['String'];
  seoTitle: Scalars['String'];
  searchDescription: Scalars['String'];
  lastPublishedAt: Scalars['DateTime'];
  urlPath: Scalars['String'];
  path: Scalars['String'];
  subPages: Array<AllPages>;
  subPagesGeneric: Array<GenericPage>;
  siblingPages: Array<AllPages>;
  parentPage: AllPages;
  ancestorPages: Array<AllPages>;
  ancestorPagesGeneric: Array<GenericPage>;
  closestAncestorOfType: Maybe<AllPages>;
  closestAncestorOfTypeGeneric: Maybe<GenericPage>;
};

export type StubPageSubPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StubPageSubPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StubPageSiblingPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StubPageAncestorPagesArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StubPageAncestorPagesGenericArgs = {
  inMenu: Maybe<Scalars['Boolean']>;
};

export type StubPageClosestAncestorOfTypeArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type StubPageClosestAncestorOfTypeGenericArgs = {
  contentType: Maybe<Scalars['String']>;
  inclusive: Maybe<Scalars['Boolean']>;
};

export type StudentGroup = Node & {
  __typename: 'StudentGroup';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  isProspective: Scalars['Boolean'];
  description: Scalars['String'];
  logo: Maybe<Image>;
  link: Scalars['String'];
  slug: Maybe<Scalars['String']>;
  mslGroup: Maybe<MslStudentGroup>;
  groupId: Scalars['Int'];
  awards: Array<AwardPeriod>;
};

export type StudentGroupConnectionExt = {
  __typename: 'StudentGroupConnectionExt';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<StudentGroupEdgeX>;
  totalCount: Maybe<Scalars['Int']>;
};

export type StudentGroupEdgeX = {
  __typename: 'StudentGroupEdgeX';
  node: StudentGroup;
  cursor: Scalars['String'];
};

export type Type = {
  __typename: 'Type';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  eventSet: EventConnection;
};

export type TypeEventSetArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UpdateMarketListing = {
  __typename: 'UpdateMarketListing';
  ok: Maybe<Scalars['Boolean']>;
  listing: Maybe<MarketListing>;
};

export type UpdateSlate = {
  __typename: 'UpdateSlate';
  ok: Maybe<Scalars['Boolean']>;
  slate: Maybe<Slate>;
};

export type Venue = Node & {
  __typename: 'Venue';
  /** The ID of the object. */
  id: Scalars['ID'];
  containsLowLight: VenueContainsLowLight;
  containsLowLightReasoning: Scalars['String'];
  containsFlashingLights: VenueContainsFlashingLights;
  containsFlashingLightsReasoning: Scalars['String'];
  containsLoudMusic: VenueContainsLoudMusic;
  containsLoudMusicReasoning: Scalars['String'];
  hasGenderNeutralToilets: VenueHasGenderNeutralToilets;
  hasGenderNeutralToiletsReasoning: Scalars['String'];
  hasAccessibleToilets: VenueHasAccessibleToilets;
  hasAccessibleToiletsReasoning: Scalars['String'];
  hasChangingFacilities: VenueHasChangingFacilities;
  hasChangingFacilitiesReasoning: Scalars['String'];
  containsUnevenGround: VenueContainsUnevenGround;
  containsUnevenGroundReasoning: Scalars['String'];
  hasLevelAccess: VenueHasLevelAccess;
  hasLevelAccessReasoning: Scalars['String'];
  name: Scalars['String'];
  websiteLink: Scalars['String'];
  shortDescription: Scalars['String'];
  featuredImage: Maybe<Image>;
  venueType: VenueVenueType;
  slug: Scalars['String'];
  ephemeral: Scalars['Boolean'];
  entryInformation: Scalars['String'];
  eventSet: EventConnection;
  /** Link this outlet with a venue's events */
  outletpageSet: Array<OutletPage>;
  venueId: Scalars['Int'];
};

export type VenueEventSetArgs = {
  before: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type VenueConnectionExt = {
  __typename: 'VenueConnectionExt';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<VenueEdgeX>;
  totalCount: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum VenueContainsFlashingLights {
  /** Not set/inherit */
  A_0 = 'A_0',
  /** False */
  A_1 = 'A_1',
  /** True */
  A_2 = 'A_2',
}

/** An enumeration. */
export enum VenueContainsLoudMusic {
  /** Not set/inherit */
  A_0 = 'A_0',
  /** False */
  A_1 = 'A_1',
  /** True */
  A_2 = 'A_2',
}

/** An enumeration. */
export enum VenueContainsLowLight {
  /** Not set/inherit */
  A_0 = 'A_0',
  /** False */
  A_1 = 'A_1',
  /** True */
  A_2 = 'A_2',
}

/** An enumeration. */
export enum VenueContainsUnevenGround {
  /** Not set/inherit */
  A_0 = 'A_0',
  /** False */
  A_1 = 'A_1',
  /** True */
  A_2 = 'A_2',
}

export type VenueEdgeX = {
  __typename: 'VenueEdgeX';
  node: Venue;
  cursor: Scalars['String'];
};

/** An enumeration. */
export enum VenueHasAccessibleToilets {
  /** Not set/inherit */
  A_0 = 'A_0',
  /** False */
  A_1 = 'A_1',
  /** True */
  A_2 = 'A_2',
}

/** An enumeration. */
export enum VenueHasChangingFacilities {
  /** Not set/inherit */
  A_0 = 'A_0',
  /** False */
  A_1 = 'A_1',
  /** True */
  A_2 = 'A_2',
}

/** An enumeration. */
export enum VenueHasGenderNeutralToilets {
  /** Not set/inherit */
  A_0 = 'A_0',
  /** False */
  A_1 = 'A_1',
  /** True */
  A_2 = 'A_2',
}

/** An enumeration. */
export enum VenueHasLevelAccess {
  /** Not set/inherit */
  A_0 = 'A_0',
  /** False */
  A_1 = 'A_1',
  /** True */
  A_2 = 'A_2',
}

/** An enumeration. */
export enum VenueVenueType {
  /** Nightclub */
  Club = 'CLUB',
  /** Bar */
  Bar = 'BAR',
  /** Uncategorised */
  Na = 'NA',
}

export type GetActiveBannersQueryVariables = {};

export type GetActiveBannersQuery = {
  __typename: 'Queries';
  allActiveBanners: Array<{
    __typename: 'Banner';
    id: string;
    outlet: string;
    heading: string;
    body: any;
    purpose: BannerPurpose;
  }>;
};

export type GetOffersQueryVariables = {};

export type GetOffersQuery = {
  __typename: 'Queries';
  allOffers: Array<{
    __typename: 'Offer';
    id: string;
    dealTag: string;
    companyName: string;
    companyWebsite: string;
    main: Maybe<any>;
    companyLogo: Maybe<{
      __typename: 'Image';
      resource: string;
      width: number;
      height: number;
    }>;
  }>;
};

export type GetActiveSlateQueryVariables = {};

export type GetActiveSlateQuery = {
  __typename: 'Queries';
  activeSlate: { __typename: 'Slate'; enhancedData: Maybe<any> };
};

export type GetAllStudentGroupsQueryVariables = {};

export type GetAllStudentGroupsQuery = {
  __typename: 'Queries';
  allGroups: {
    __typename: 'StudentGroupConnectionExt';
    edges: Array<{
      __typename: 'StudentGroupEdgeX';
      node: { __typename: 'StudentGroup' } & StudentGroupFragmentFragment;
    }>;
  };
};

export type StudentGroupFragmentFragment = {
  __typename: 'StudentGroup';
  groupId: number;
  name: string;
  description: string;
  link: string;
  isProspective: boolean;
  logo: Maybe<{ __typename: 'Image'; resource: string }>;
  mslGroup: Maybe<{
    __typename: 'MSLStudentGroup';
    id: string;
    category: Maybe<{
      __typename: 'MSLStudentGroupCategory';
      id: string;
      name: string;
    }>;
  }>;
};

export type GetAwardsForGroupBySlugQueryVariables = {
  slug: Maybe<Scalars['String']>;
};

export type GetAwardsForGroupBySlugQuery = {
  __typename: 'Queries';
  group: Maybe<{
    __typename: 'StudentGroup';
    awards: Array<{ __typename: 'AwardPeriod' } & AwardsPeriodFragment>;
  }>;
};

export type AwardFragment = {
  __typename: 'Award';
  id: string;
  name: string;
  description: string;
  link: string;
  icon: AwardIcon;
};

export type AwardAuthorityFragment = {
  __typename: 'AwardAuthority';
  name: string;
  slug: string;
};

export type AwardedFragment = {
  __typename: 'AwardAwarded';
  id: string;
  grade: number;
  award: { __typename: 'Award' } & AwardFragment;
};

export type AwardsPeriodFragment = {
  __typename: 'AwardPeriod';
  id: string;
  startDate: any;
  endDate: any;
  displayName: string;
  authority: { __typename: 'AwardAuthority' } & AwardAuthorityFragment;
  awarded: Array<{ __typename: 'AwardAwarded' } & AwardedFragment>;
};

export type GetActiveFlagsQueryVariables = {};

export type GetActiveFlagsQuery = {
  __typename: 'Queries';
  allFlags: Array<{
    __typename: 'Flag';
    name: string;
    mode: FlagMode;
    state: boolean;
    expired: boolean;
  }>;
};

export type AcceptConsentMutationVariables = {
  slug: Scalars['String'];
};

export type AcceptConsentMutation = {
  __typename: 'Mutations';
  acceptConsent: Maybe<{
    __typename: 'AcceptConsentForm';
    authorisation: Maybe<{
      __typename: 'ConsentCodeAuthorisation';
      code: string;
    }>;
  }>;
};

export type ChangeStateMutationVariables = {
  listingId: Maybe<Scalars['Int']>;
  state: Maybe<Scalars['String']>;
};

export type ChangeStateMutation = {
  __typename: 'Mutations';
  updateMarketListing: Maybe<{
    __typename: 'UpdateMarketListing';
    listing: Maybe<{
      __typename: 'MarketListing';
      id: string;
      pk: number;
      state: MarketListingState;
    }>;
  }>;
};

export type GetMarketListingQueryVariables = {
  listingId: Scalars['Int'];
};

export type GetMarketListingQuery = {
  __typename: 'Queries';
  marketListing: Maybe<{
    __typename: 'MarketListing';
    pk: number;
    id: string;
    bookTitle: string;
    bookAuthor: string;
    description: string;
    buyPrice: number;
    state: MarketListingState;
    contactDetails: Maybe<string>;
    section: {
      __typename: 'MarketListingSection';
      title: string;
      slug: string;
    };
    image: Maybe<{ __typename: 'Image'; resource: string }>;
    listingUser: { __typename: 'PublicUser'; userId: number; name: string };
  }>;
};

export type RequestMarketListingContactDetailsMutationVariables = {
  listingId: Maybe<Scalars['Int']>;
};

export type RequestMarketListingContactDetailsMutation = {
  __typename: 'Mutations';
  requestMarketListingContactDetails: Maybe<{
    __typename: 'RequestDetails';
    listing: Maybe<{
      __typename: 'MarketListing';
      id: string;
      contactDetails: Maybe<string>;
    }>;
  }>;
};

export type UpdateListingImageMutationVariables = {
  listingId: Maybe<Scalars['Int']>;
  imageId: Maybe<Scalars['Int']>;
};

export type UpdateListingImageMutation = {
  __typename: 'Mutations';
  updateMarketListing: Maybe<{
    __typename: 'UpdateMarketListing';
    listing: Maybe<{
      __typename: 'MarketListing';
      pk: number;
      id: string;
      bookTitle: string;
      bookAuthor: string;
      description: string;
      buyPrice: number;
      state: MarketListingState;
      section: {
        __typename: 'MarketListingSection';
        title: string;
        slug: string;
      };
      image: Maybe<{ __typename: 'Image'; resource: string }>;
    }>;
  }>;
};

export type CreateListingMutationVariables = {
  listingData: MarketListingInput;
};

export type CreateListingMutation = {
  __typename: 'Mutations';
  createMarketListing: Maybe<{
    __typename: 'CreateMarketListing';
    ok: Maybe<boolean>;
    listing: Maybe<{ __typename: 'MarketListing'; pk: number }>;
  }>;
};

export type GetViewerQueryVariables = {};

export type GetViewerQuery = {
  __typename: 'Queries';
  viewer: Maybe<{
    __typename: 'ClientUser';
    name: Maybe<string>;
    userId: Maybe<number>;
  }>;
};

export type GetViewerMarketListingQueryVariables = {
  filters: Maybe<MarketListingsFilter>;
};

export type GetViewerMarketListingQuery = {
  __typename: 'Queries';
  allMarketListings: {
    __typename: 'MarketListingConnectionExt';
    edges: Array<{
      __typename: 'MarketListingEdgeX';
      node: {
        __typename: 'MarketListing';
        pk: number;
        id: string;
        bookTitle: string;
        bookAuthor: string;
        buyPrice: number;
        state: MarketListingState;
        description: string;
        image: Maybe<{ __typename: 'Image'; resource: string }>;
      };
    }>;
  };
};

export type SearchMarketListingsQueryVariables = {
  filters: Maybe<MarketListingsFilter>;
};

export type SearchMarketListingsQuery = {
  __typename: 'Queries';
  allMarketListings: {
    __typename: 'MarketListingConnectionExt';
    edges: Array<{
      __typename: 'MarketListingEdgeX';
      node: { __typename: 'MarketListing' } & MarketListingFragment;
    }>;
  };
};

export type GetListingsForSectionQueryVariables = {
  filters: Maybe<MarketListingsFilter>;
  sectionSlug: Scalars['String'];
};

export type GetListingsForSectionQuery = {
  __typename: 'Queries';
  allMarketListings: {
    __typename: 'MarketListingConnectionExt';
    edges: Array<{
      __typename: 'MarketListingEdgeX';
      node: { __typename: 'MarketListing' } & MarketListingFragment;
    }>;
  };
  marketSection: Maybe<{
    __typename: 'MarketListingSection';
    title: string;
    slug: string;
  }>;
};

export type GetAllMarketSectionsQueryVariables = {};

export type GetAllMarketSectionsQuery = {
  __typename: 'Queries';
  allMarketSections: Array<{
    __typename: 'MarketListingSection';
    id: string;
    pk: number;
    title: string;
    slug: string;
  }>;
};

export type MarketListingFragment = {
  __typename: 'MarketListing';
  pk: number;
  id: string;
  bookTitle: string;
  bookAuthor: string;
  buyPrice: number;
  description: string;
  state: MarketListingState;
  image: Maybe<{ __typename: 'Image'; resource: string }>;
};

export type GetContentByPathQueryVariables = {
  path: Maybe<Scalars['String']>;
  previewToken: Maybe<Scalars['String']>;
};

export type GetContentByPathQuery = {
  __typename: 'Queries';
  page: Maybe<
    | ({
        __typename: 'StaffPage';
        body: any;
      } & ContentPageGenerals_StaffPage_Fragment)
    | ({ __typename: 'GenericPage' } & ContentPageGenerals_GenericPage_Fragment)
    | ({
        __typename: 'StaffMemberSnippet';
      } & ContentPageGenerals_StaffMemberSnippet_Fragment)
    | ({
        __typename: 'SectionContentPage';
        sidebarBody: any;
        body: any;
        headingImageAsHero: boolean;
        contentsInSidebar: boolean;
        headingImage: Maybe<{ __typename: 'Image' } & FalmerImageFragment>;
      } & ContentPageGenerals_SectionContentPage_Fragment)
    | ({
        __typename: 'SelectionGridPage';
        body: any;
      } & ContentPageGenerals_SelectionGridPage_Fragment)
    | ({
        __typename: 'OfficerOverviewPage';
        role: string;
        roleDescription: any;
        firstName: string;
        lastName: string;
        pledges: any;
        twitterUsername: string;
        facebookUrl: string;
        instagramUrl: string;
        youtubeSplash: string;
        officerImage: Maybe<{ __typename: 'Image' } & FalmerImageFragment>;
      } & ContentPageGenerals_OfficerOverviewPage_Fragment)
    | ({
        __typename: 'OfficersIndex';
        subPages: Array<
          | { __typename: 'StaffPage' }
          | { __typename: 'StaffMemberSnippet' }
          | { __typename: 'SectionContentPage' }
          | { __typename: 'SelectionGridPage' }
          | ({
              __typename: 'OfficerOverviewPage';
              role: string;
              roleDescription: any;
              firstName: string;
              lastName: string;
              twitterUsername: string;
              facebookUrl: string;
              instagramUrl: string;
              officerImage: Maybe<
                { __typename: 'Image' } & FalmerImageFragment
              >;
            } & ContentPageGenerals_OfficerOverviewPage_Fragment)
          | { __typename: 'OfficersIndex' }
          | { __typename: 'OfficerEventsPage' }
          | { __typename: 'HomePage' }
          | { __typename: 'KBRootPage' }
          | { __typename: 'KBCategoryPage' }
          | { __typename: 'AnswerPage' }
          | { __typename: 'ReferencePage' }
          | { __typename: 'DetailedGuidePage' }
          | { __typename: 'DetailedGuideSectionPage' }
          | { __typename: 'StubPage' }
          | { __typename: 'BasicContentPage' }
          | { __typename: 'OutletIndexPage' }
          | { __typename: 'OutletPage' }
          | { __typename: 'SchemeIndexPage' }
          | { __typename: 'SchemePage' }
          | { __typename: 'FreshersHomepage' }
          | { __typename: 'ClickThrough' }
        >;
        section: Maybe<
          {
            __typename: 'GenericPage';
            subPagesGeneric: Array<
              { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
            >;
          } & ContentPageGeneralsGenericFragment
        >;
      } & ContentPageGenerals_OfficersIndex_Fragment)
    | ({
        __typename: 'OfficerEventsPage';
        description: any;
        curator: Maybe<{ __typename: 'Curator'; id: string }>;
      } & ContentPageGenerals_OfficerEventsPage_Fragment)
    | ({
        __typename: 'OutletPage';
        main: Maybe<any>;
        openingTimes: any;
        menu: any;
        deals: any;
        googleMapsPlaceId: string;
        contactDetails: any;
        heroImage: { __typename: 'Image' } & FalmerImageFragment;
      } & ContentPageGenerals_OutletPage_Fragment)
    | ({
        __typename: 'HomePage';
        fullTimeOfficers: any;
        partTimeOfficers: any;
      } & ContentPageGenerals_HomePage_Fragment)
    | ({
        __typename: 'KBRootPage';
        introduction: any;
        categories: Array<
          | { __typename: 'StaffPage' }
          | { __typename: 'StaffMemberSnippet' }
          | { __typename: 'SectionContentPage' }
          | { __typename: 'SelectionGridPage' }
          | { __typename: 'OfficerOverviewPage' }
          | { __typename: 'OfficersIndex' }
          | { __typename: 'OfficerEventsPage' }
          | { __typename: 'HomePage' }
          | { __typename: 'KBRootPage' }
          | ({
              __typename: 'KBCategoryPage';
              pageIcon: Maybe<{ __typename: 'FalmerFile'; url: Maybe<string> }>;
            } & ContentPageGenerals_KbCategoryPage_Fragment)
          | { __typename: 'AnswerPage' }
          | { __typename: 'ReferencePage' }
          | { __typename: 'DetailedGuidePage' }
          | { __typename: 'DetailedGuideSectionPage' }
          | { __typename: 'StubPage' }
          | { __typename: 'BasicContentPage' }
          | { __typename: 'OutletIndexPage' }
          | { __typename: 'OutletPage' }
          | { __typename: 'SchemeIndexPage' }
          | { __typename: 'SchemePage' }
          | { __typename: 'FreshersHomepage' }
          | { __typename: 'ClickThrough' }
        >;
      } & ContentPageGenerals_KbRootPage_Fragment)
    | ({
        __typename: 'KBCategoryPage';
        rootPage: Maybe<
          | { __typename: 'StaffPage' }
          | { __typename: 'StaffMemberSnippet' }
          | { __typename: 'SectionContentPage' }
          | { __typename: 'SelectionGridPage' }
          | { __typename: 'OfficerOverviewPage' }
          | { __typename: 'OfficersIndex' }
          | { __typename: 'OfficerEventsPage' }
          | { __typename: 'HomePage' }
          | ({
              __typename: 'KBRootPage';
            } & ContentPageGenerals_KbRootPage_Fragment)
          | { __typename: 'KBCategoryPage' }
          | { __typename: 'AnswerPage' }
          | { __typename: 'ReferencePage' }
          | { __typename: 'DetailedGuidePage' }
          | { __typename: 'DetailedGuideSectionPage' }
          | { __typename: 'StubPage' }
          | { __typename: 'BasicContentPage' }
          | { __typename: 'OutletIndexPage' }
          | { __typename: 'OutletPage' }
          | { __typename: 'SchemeIndexPage' }
          | { __typename: 'SchemePage' }
          | { __typename: 'FreshersHomepage' }
          | { __typename: 'ClickThrough' }
        >;
        subPagesGeneric: Array<
          { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
        >;
      } & ContentPageGenerals_KbCategoryPage_Fragment)
    | ({
        __typename: 'AnswerPage';
        content: Maybe<any>;
        relatedLinks: any;
        staffOwners: any;
      } & KbTypes_AnswerPage_Fragment &
        ContentPageGenerals_AnswerPage_Fragment)
    | ({
        __typename: 'ReferencePage';
        content: Maybe<any>;
        relatedLinks: any;
        staffOwners: any;
      } & KbTypes_ReferencePage_Fragment &
        ContentPageGenerals_ReferencePage_Fragment)
    | ({
        __typename: 'DetailedGuidePage';
        subPagesGeneric: Array<
          { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
        >;
      } & KbTypes_DetailedGuidePage_Fragment &
        ContentPageGenerals_DetailedGuidePage_Fragment)
    | ({
        __typename: 'DetailedGuideSectionPage';
        content: Maybe<any>;
        parentPage:
          | { __typename: 'StaffPage' }
          | { __typename: 'StaffMemberSnippet' }
          | { __typename: 'SectionContentPage' }
          | { __typename: 'SelectionGridPage' }
          | { __typename: 'OfficerOverviewPage' }
          | { __typename: 'OfficersIndex' }
          | { __typename: 'OfficerEventsPage' }
          | { __typename: 'HomePage' }
          | { __typename: 'KBRootPage' }
          | { __typename: 'KBCategoryPage' }
          | { __typename: 'AnswerPage' }
          | { __typename: 'ReferencePage' }
          | ({
              __typename: 'DetailedGuidePage';
              relatedLinks: any;
              staffOwners: any;
              subPagesGeneric: Array<
                {
                  __typename: 'GenericPage';
                } & ContentPageGeneralsGenericFragment
              >;
            } & ContentPageGenerals_DetailedGuidePage_Fragment &
              KbTypes_DetailedGuidePage_Fragment)
          | { __typename: 'DetailedGuideSectionPage' }
          | { __typename: 'StubPage' }
          | { __typename: 'BasicContentPage' }
          | { __typename: 'OutletIndexPage' }
          | { __typename: 'OutletPage' }
          | { __typename: 'SchemeIndexPage' }
          | { __typename: 'SchemePage' }
          | { __typename: 'FreshersHomepage' }
          | { __typename: 'ClickThrough' };
      } & ContentPageGenerals_DetailedGuideSectionPage_Fragment)
    | ({ __typename: 'StubPage' } & ContentPageGenerals_StubPage_Fragment)
    | ({
        __typename: 'BasicContentPage';
        content: Maybe<any>;
      } & ContentPageGenerals_BasicContentPage_Fragment)
    | ({
        __typename: 'OutletIndexPage';
        preamble: any;
        subPages: Array<
          | { __typename: 'StaffPage' }
          | { __typename: 'StaffMemberSnippet' }
          | { __typename: 'SectionContentPage' }
          | { __typename: 'SelectionGridPage' }
          | { __typename: 'OfficerOverviewPage' }
          | { __typename: 'OfficersIndex' }
          | { __typename: 'OfficerEventsPage' }
          | { __typename: 'HomePage' }
          | { __typename: 'KBRootPage' }
          | { __typename: 'KBCategoryPage' }
          | { __typename: 'AnswerPage' }
          | { __typename: 'ReferencePage' }
          | { __typename: 'DetailedGuidePage' }
          | { __typename: 'DetailedGuideSectionPage' }
          | { __typename: 'StubPage' }
          | { __typename: 'BasicContentPage' }
          | { __typename: 'OutletIndexPage' }
          | ({
              __typename: 'OutletPage';
              heroImage: { __typename: 'Image' } & FalmerImageFragment;
            } & ContentPageGenerals_OutletPage_Fragment)
          | { __typename: 'SchemeIndexPage' }
          | { __typename: 'SchemePage' }
          | { __typename: 'FreshersHomepage' }
          | { __typename: 'ClickThrough' }
        >;
        section: Maybe<
          {
            __typename: 'GenericPage';
            subPagesGeneric: Array<
              { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
            >;
          } & ContentPageGeneralsGenericFragment
        >;
      } & ContentPageGenerals_OutletIndexPage_Fragment)
    | ({
        __typename: 'SchemeIndexPage';
      } & ContentPageGenerals_SchemeIndexPage_Fragment)
    | ({ __typename: 'SchemePage' } & ContentPageGenerals_SchemePage_Fragment)
    | ({
        __typename: 'FreshersHomepage';
        countdownTarget: Maybe<any>;
        countdownCaption: string;
        heroText: any;
        content: Maybe<any>;
      } & ContentPageGenerals_FreshersHomepage_Fragment)
    | ({
        __typename: 'ClickThrough';
      } & ContentPageGenerals_ClickThrough_Fragment)
  >;
};

type ContentPageGenerals_StaffPage_Fragment = {
  __typename: 'StaffPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_GenericPage_Fragment = {
  __typename: 'GenericPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_StaffMemberSnippet_Fragment = {
  __typename: 'StaffMemberSnippet';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_SectionContentPage_Fragment = {
  __typename: 'SectionContentPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_SelectionGridPage_Fragment = {
  __typename: 'SelectionGridPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_OfficerOverviewPage_Fragment = {
  __typename: 'OfficerOverviewPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_OfficersIndex_Fragment = {
  __typename: 'OfficersIndex';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_OfficerEventsPage_Fragment = {
  __typename: 'OfficerEventsPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_OutletPage_Fragment = {
  __typename: 'OutletPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_HomePage_Fragment = {
  __typename: 'HomePage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_KbRootPage_Fragment = {
  __typename: 'KBRootPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_KbCategoryPage_Fragment = {
  __typename: 'KBCategoryPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_AnswerPage_Fragment = {
  __typename: 'AnswerPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_ReferencePage_Fragment = {
  __typename: 'ReferencePage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_DetailedGuidePage_Fragment = {
  __typename: 'DetailedGuidePage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_DetailedGuideSectionPage_Fragment = {
  __typename: 'DetailedGuideSectionPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_StubPage_Fragment = {
  __typename: 'StubPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_BasicContentPage_Fragment = {
  __typename: 'BasicContentPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_OutletIndexPage_Fragment = {
  __typename: 'OutletIndexPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_SchemeIndexPage_Fragment = {
  __typename: 'SchemeIndexPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_SchemePage_Fragment = {
  __typename: 'SchemePage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_FreshersHomepage_Fragment = {
  __typename: 'FreshersHomepage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

type ContentPageGenerals_ClickThrough_Fragment = {
  __typename: 'ClickThrough';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

export type ContentPageGeneralsFragment =
  | ContentPageGenerals_StaffPage_Fragment
  | ContentPageGenerals_GenericPage_Fragment
  | ContentPageGenerals_StaffMemberSnippet_Fragment
  | ContentPageGenerals_SectionContentPage_Fragment
  | ContentPageGenerals_SelectionGridPage_Fragment
  | ContentPageGenerals_OfficerOverviewPage_Fragment
  | ContentPageGenerals_OfficersIndex_Fragment
  | ContentPageGenerals_OfficerEventsPage_Fragment
  | ContentPageGenerals_OutletPage_Fragment
  | ContentPageGenerals_HomePage_Fragment
  | ContentPageGenerals_KbRootPage_Fragment
  | ContentPageGenerals_KbCategoryPage_Fragment
  | ContentPageGenerals_AnswerPage_Fragment
  | ContentPageGenerals_ReferencePage_Fragment
  | ContentPageGenerals_DetailedGuidePage_Fragment
  | ContentPageGenerals_DetailedGuideSectionPage_Fragment
  | ContentPageGenerals_StubPage_Fragment
  | ContentPageGenerals_BasicContentPage_Fragment
  | ContentPageGenerals_OutletIndexPage_Fragment
  | ContentPageGenerals_SchemeIndexPage_Fragment
  | ContentPageGenerals_SchemePage_Fragment
  | ContentPageGenerals_FreshersHomepage_Fragment
  | ContentPageGenerals_ClickThrough_Fragment;

export type ContentPageGeneralsGenericFragment = {
  __typename: 'GenericPage';
  title: string;
  slug: string;
  path: string;
  seoTitle: string;
  searchDescription: string;
  lastPublishedAt: any;
  contentType: string;
  subPagesWayfinding: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    seoTitle: string;
    searchDescription: string;
    contentType: string;
  }>;
  ancestorPagesGeneric: Array<{
    __typename: 'GenericPage';
    title: string;
    slug: string;
    path: string;
    contentType: string;
    subPagesGeneric: Array<{
      __typename: 'GenericPage';
      contentType: string;
      title: string;
      slug: string;
      path: string;
    }>;
  }>;
};

export type FalmerImageFragment = {
  __typename: 'Image';
  width: number;
  height: number;
  resource: string;
};

type KbTypes_StaffPage_Fragment = {
  __typename: 'StaffPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_GenericPage_Fragment = {
  __typename: 'GenericPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_StaffMemberSnippet_Fragment = {
  __typename: 'StaffMemberSnippet';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_SectionContentPage_Fragment = {
  __typename: 'SectionContentPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_SelectionGridPage_Fragment = {
  __typename: 'SelectionGridPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_OfficerOverviewPage_Fragment = {
  __typename: 'OfficerOverviewPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_OfficersIndex_Fragment = {
  __typename: 'OfficersIndex';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_OfficerEventsPage_Fragment = {
  __typename: 'OfficerEventsPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_OutletPage_Fragment = {
  __typename: 'OutletPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_HomePage_Fragment = {
  __typename: 'HomePage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_KbRootPage_Fragment = {
  __typename: 'KBRootPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_KbCategoryPage_Fragment = {
  __typename: 'KBCategoryPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_AnswerPage_Fragment = {
  __typename: 'AnswerPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_ReferencePage_Fragment = {
  __typename: 'ReferencePage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_DetailedGuidePage_Fragment = {
  __typename: 'DetailedGuidePage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_DetailedGuideSectionPage_Fragment = {
  __typename: 'DetailedGuideSectionPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_StubPage_Fragment = {
  __typename: 'StubPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_BasicContentPage_Fragment = {
  __typename: 'BasicContentPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_OutletIndexPage_Fragment = {
  __typename: 'OutletIndexPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_SchemeIndexPage_Fragment = {
  __typename: 'SchemeIndexPage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_SchemePage_Fragment = {
  __typename: 'SchemePage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_FreshersHomepage_Fragment = {
  __typename: 'FreshersHomepage';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

type KbTypes_ClickThrough_Fragment = {
  __typename: 'ClickThrough';
  root: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
  category: Maybe<
    { __typename: 'GenericPage' } & ContentPageGeneralsGenericFragment
  >;
};

export type KbTypesFragment =
  | KbTypes_StaffPage_Fragment
  | KbTypes_GenericPage_Fragment
  | KbTypes_StaffMemberSnippet_Fragment
  | KbTypes_SectionContentPage_Fragment
  | KbTypes_SelectionGridPage_Fragment
  | KbTypes_OfficerOverviewPage_Fragment
  | KbTypes_OfficersIndex_Fragment
  | KbTypes_OfficerEventsPage_Fragment
  | KbTypes_OutletPage_Fragment
  | KbTypes_HomePage_Fragment
  | KbTypes_KbRootPage_Fragment
  | KbTypes_KbCategoryPage_Fragment
  | KbTypes_AnswerPage_Fragment
  | KbTypes_ReferencePage_Fragment
  | KbTypes_DetailedGuidePage_Fragment
  | KbTypes_DetailedGuideSectionPage_Fragment
  | KbTypes_StubPage_Fragment
  | KbTypes_BasicContentPage_Fragment
  | KbTypes_OutletIndexPage_Fragment
  | KbTypes_SchemeIndexPage_Fragment
  | KbTypes_SchemePage_Fragment
  | KbTypes_FreshersHomepage_Fragment
  | KbTypes_ClickThrough_Fragment;

export type FreshersMenuQueryQueryVariables = {};

export type FreshersMenuQueryQuery = {
  __typename: 'Queries';
  page: Maybe<
    | { __typename: 'StaffPage'; title: string }
    | { __typename: 'GenericPage'; title: string }
    | { __typename: 'StaffMemberSnippet'; title: string }
    | { __typename: 'SectionContentPage'; title: string }
    | { __typename: 'SelectionGridPage'; title: string }
    | { __typename: 'OfficerOverviewPage'; title: string }
    | { __typename: 'OfficersIndex'; title: string }
    | { __typename: 'OfficerEventsPage'; title: string }
    | { __typename: 'OutletPage'; title: string }
    | { __typename: 'HomePage'; title: string }
    | { __typename: 'KBRootPage'; title: string }
    | { __typename: 'KBCategoryPage'; title: string }
    | { __typename: 'AnswerPage'; title: string }
    | { __typename: 'ReferencePage'; title: string }
    | { __typename: 'DetailedGuidePage'; title: string }
    | { __typename: 'DetailedGuideSectionPage'; title: string }
    | { __typename: 'StubPage'; title: string }
    | { __typename: 'BasicContentPage'; title: string }
    | { __typename: 'OutletIndexPage'; title: string }
    | { __typename: 'SchemeIndexPage'; title: string }
    | { __typename: 'SchemePage'; title: string }
    | { __typename: 'FreshersHomepage'; title: string }
    | { __typename: 'ClickThrough'; title: string }
  >;
};

export type GetFullEventInfoQueryVariables = {
  eventId: Maybe<Scalars['Int']>;
};

export type GetFullEventInfoQuery = {
  __typename: 'Queries';
  event: {
    __typename: 'Event';
    id: string;
    eventId: number;
    slug: string;
    title: string;
    startTime: any;
    endTime: any;
    locationDisplay: string;
    kicker: string;
    bodyHtml: string;
    shortDescription: string;
    url: string;
    socialFacebook: string;
    ticketType: EventTicketType;
    ticketData: string;
    ticketLevel: EventTicketLevel;
    mslEventId: Maybe<number>;
    cost: EventCost;
    canceledAt: Maybe<any>;
    containsLowLight: PaValues;
    containsLowLightReasoning: string;
    containsFlashingLights: PaValues;
    containsFlashingLightsReasoning: string;
    containsLoudMusic: PaValues;
    containsLoudMusicReasoning: string;
    containsUnevenGround: PaValues;
    containsUnevenGroundReasoning: string;
    hasGenderNeutralToilets: PaValues;
    hasGenderNeutralToiletsReasoning: string;
    hasAccessibleToilets: PaValues;
    hasAccessibleToiletsReasoning: string;
    hasChangingFacilities: PaValues;
    hasChangingFacilitiesReasoning: string;
    hasLevelAccess: PaValues;
    hasLevelAccessReasoning: string;
    isOver18Only: boolean;
    audienceJustForPgs: boolean;
    audienceSuitableKidsFamilies: boolean;
    audienceGoodToMeetPeople: boolean;
    userLike: Maybe<{ __typename: 'EventLike' } & UserLikeFragment>;
    type: Maybe<{ __typename: 'Type'; name: string }>;
    categories: Array<{
      __typename: 'CategoryNode';
      name: string;
      slug: string;
      parent: Maybe<{
        __typename: 'CategoryNode';
        name: string;
        slug: string;
        parent: Maybe<{
          __typename: 'CategoryNode';
          name: string;
          slug: string;
        }>;
      }>;
    }>;
    bundle: Maybe<{ __typename: 'Bundle'; name: string; slug: string }>;
    brand: Maybe<{
      __typename: 'BrandingPeriod';
      name: string;
      slug: string;
      eventAppend: any;
      accent: string;
      overrideListingsRoot: string;
    }>;
    venue: Maybe<{ __typename: 'Venue'; name: string; websiteLink: string }>;
    featuredImage: Maybe<{ __typename: 'Image'; resource: string }>;
    studentGroup: Maybe<{
      __typename: 'StudentGroup';
      name: string;
      link: string;
    }>;
    parent: Maybe<{ __typename: 'Event' } & EventCardFragment>;
    children: Array<{ __typename: 'Event' } & EventCardFragment>;
  };
};

export type EventCardFragment = {
  __typename: 'Event';
  id: string;
  eventId: number;
  slug: string;
  title: string;
  startTime: any;
  endTime: any;
  locationDisplay: string;
  kicker: string;
  shortDescription: string;
  url: string;
  cost: EventCost;
  ticketLevel: EventTicketLevel;
  ticketType: EventTicketType;
  isOver18Only: boolean;
  canceledAt: Maybe<any>;
  type: Maybe<{ __typename: 'Type'; name: string }>;
  categories: Array<{ __typename: 'CategoryNode'; name: string }>;
  bundle: Maybe<{ __typename: 'Bundle'; name: string }>;
  venue: Maybe<{ __typename: 'Venue'; name: string; websiteLink: string }>;
  featuredImage: Maybe<{ __typename: 'Image'; resource: string }>;
  userLike: Maybe<{ __typename: 'EventLike' } & UserLikeFragment>;
};

export type UserLikeFragment = {
  __typename: 'EventLike';
  source: EventLikeSource;
};

export type GetLiveBrandingPeriodsQueryVariables = {};

export type GetLiveBrandingPeriodsQuery = {
  __typename: 'Queries';
  allBrandingPeriods: Array<{
    __typename: 'BrandingPeriod';
    name: string;
    slug: string;
  }>;
};

export type GetBrandingPeriodQueryVariables = {
  brandSlug: Scalars['String'];
};

export type GetBrandingPeriodQuery = {
  __typename: 'Queries';
  brandingPeriod: {
    __typename: 'BrandingPeriod';
    name: string;
    description: any;
    accent: string;
    websiteLink: string;
    logo: Maybe<{ __typename: 'Image'; resource: string }>;
    logoVector: Maybe<{ __typename: 'File'; resource: Maybe<string> }>;
    bundleSet: Array<{ __typename: 'Bundle'; slug: string; name: string }>;
  };
};

export type EventListingFragmentFragment = {
  __typename: 'Event';
  id: string;
  eventId: number;
  slug: string;
  title: string;
  startTime: any;
  endTime: any;
  locationDisplay: string;
  kicker: string;
  shortDescription: string;
  url: string;
  cost: EventCost;
  ticketLevel: EventTicketLevel;
  ticketType: EventTicketType;
  canceledAt: Maybe<any>;
  audienceSuitableKidsFamilies: boolean;
  isOver18Only: boolean;
  type: Maybe<{ __typename: 'Type'; name: string }>;
  categories: Array<{ __typename: 'CategoryNode'; name: string }>;
  userLike: Maybe<{ __typename: 'EventLike'; source: EventLikeSource }>;
  bundle: Maybe<{ __typename: 'Bundle'; name: string }>;
  venue: Maybe<{ __typename: 'Venue'; name: string; websiteLink: string }>;
  featuredImage: Maybe<{ __typename: 'Image'; resource: string }>;
};

export type GetAllEventsWithFilterQueryVariables = {
  filter: Maybe<EventFilterInput>;
  skipEmbargo: Maybe<Scalars['Boolean']>;
};

export type GetAllEventsWithFilterQuery = {
  __typename: 'Queries';
  allEvents: {
    __typename: 'EventConnectionExt';
    edges: Array<{
      __typename: 'EventEdgeX';
      node: { __typename: 'Event' } & EventListingFragmentFragment;
    }>;
  };
};

export type EventListingsBrandingPeriodQueryVariables = {
  filter: Maybe<EventFilterInput>;
  brandSlug: Scalars['String'];
};

export type EventListingsBrandingPeriodQuery = {
  __typename: 'Queries';
  allEvents: {
    __typename: 'EventConnectionExt';
    edges: Array<{
      __typename: 'EventEdgeX';
      node: { __typename: 'Event' } & EventListingFragmentFragment;
    }>;
  };
  brandingPeriod: {
    __typename: 'BrandingPeriod';
    name: string;
    description: any;
    accent: string;
    websiteLink: string;
    logo: Maybe<{ __typename: 'Image'; resource: string }>;
    logoVector: Maybe<{ __typename: 'File'; resource: Maybe<string> }>;
  };
};

export type GetEventsByBundleSlugQueryVariables = {
  filter: Maybe<EventFilterInput>;
  bundleSlug: Scalars['String'];
};

export type GetEventsByBundleSlugQuery = {
  __typename: 'Queries';
  allEvents: {
    __typename: 'EventConnectionExt';
    edges: Array<{
      __typename: 'EventEdgeX';
      node: { __typename: 'Event' } & EventListingFragmentFragment;
    }>;
  };
  bundle: {
    __typename: 'Bundle';
    name: string;
    slug: string;
    ticketData: string;
    ticketLevel: BundleTicketLevel;
    ticketType: BundleTicketType;
  };
};

export type LikeEventMutationVariables = {
  eventId: Scalars['Int'];
  type: Scalars['String'];
};

export type LikeEventMutation = {
  __typename: 'Mutations';
  likeEvent: Maybe<{
    __typename: 'LikeEvent';
    event: Maybe<{
      __typename: 'Event';
      id: string;
      userLike: Maybe<{ __typename: 'EventLike'; source: EventLikeSource }>;
    }>;
  }>;
};

export type GetUserLikedEventsQueryVariables = {
  filter: Maybe<EventFilterInput>;
};

export type GetUserLikedEventsQuery = {
  __typename: 'Queries';
  allEvents: {
    __typename: 'EventConnectionExt';
    edges: Array<{
      __typename: 'EventEdgeX';
      node: { __typename: 'Event' } & EventListingFragmentFragment;
    }>;
  };
};

export type GetConsentFormBySlugQueryVariables = {
  slug: Scalars['String'];
};

export type GetConsentFormBySlugQuery = {
  __typename: 'Queries';
  consentForm: Maybe<{
    __typename: 'ConsentCodeForm';
    title: string;
    body: string;
  }>;
};

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'Node',
        possibleTypes: [
          {
            name: 'MarketListing',
          },
          {
            name: 'Image',
          },
          {
            name: 'Event',
          },
          {
            name: 'Venue',
          },
          {
            name: 'StudentGroup',
          },
          {
            name: 'MSLEvent',
          },
          {
            name: 'Offer',
          },
          {
            name: 'Slate',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'KnowledgeBase',
        possibleTypes: [],
      },
      {
        kind: 'UNION',
        name: 'AllPages',
        possibleTypes: [
          {
            name: 'StaffPage',
          },
          {
            name: 'StaffMemberSnippet',
          },
          {
            name: 'SectionContentPage',
          },
          {
            name: 'SelectionGridPage',
          },
          {
            name: 'OfficerOverviewPage',
          },
          {
            name: 'OfficersIndex',
          },
          {
            name: 'OfficerEventsPage',
          },
          {
            name: 'HomePage',
          },
          {
            name: 'KBRootPage',
          },
          {
            name: 'KBCategoryPage',
          },
          {
            name: 'AnswerPage',
          },
          {
            name: 'ReferencePage',
          },
          {
            name: 'DetailedGuidePage',
          },
          {
            name: 'DetailedGuideSectionPage',
          },
          {
            name: 'StubPage',
          },
          {
            name: 'BasicContentPage',
          },
          {
            name: 'OutletIndexPage',
          },
          {
            name: 'OutletPage',
          },
          {
            name: 'SchemeIndexPage',
          },
          {
            name: 'SchemePage',
          },
          {
            name: 'FreshersHomepage',
          },
          {
            name: 'ClickThrough',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'Page',
        possibleTypes: [
          {
            name: 'StaffPage',
          },
          {
            name: 'GenericPage',
          },
          {
            name: 'StaffMemberSnippet',
          },
          {
            name: 'SectionContentPage',
          },
          {
            name: 'SelectionGridPage',
          },
          {
            name: 'OfficerOverviewPage',
          },
          {
            name: 'OfficersIndex',
          },
          {
            name: 'OfficerEventsPage',
          },
          {
            name: 'OutletPage',
          },
          {
            name: 'HomePage',
          },
          {
            name: 'KBRootPage',
          },
          {
            name: 'KBCategoryPage',
          },
          {
            name: 'AnswerPage',
          },
          {
            name: 'ReferencePage',
          },
          {
            name: 'DetailedGuidePage',
          },
          {
            name: 'DetailedGuideSectionPage',
          },
          {
            name: 'StubPage',
          },
          {
            name: 'BasicContentPage',
          },
          {
            name: 'OutletIndexPage',
          },
          {
            name: 'SchemeIndexPage',
          },
          {
            name: 'SchemePage',
          },
          {
            name: 'FreshersHomepage',
          },
          {
            name: 'ClickThrough',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'KbSection',
        possibleTypes: [],
      },
      {
        kind: 'INTERFACE',
        name: 'KbTopic',
        possibleTypes: [],
      },
      {
        kind: 'INTERFACE',
        name: 'KbArticle',
        possibleTypes: [],
      },
      {
        kind: 'INTERFACE',
        name: 'KbReference',
        possibleTypes: [],
      },
    ],
  },
};
export default result;
