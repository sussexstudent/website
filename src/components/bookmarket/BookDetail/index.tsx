import React from 'react';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link, RouteComponentProps } from 'react-router-dom';
import REQUEST_CONTACT_DETAILS_MUTATION from './RequestContactDetails.graphql';
import GET_LISTING_QUERY from './GetListing.graphql';
import UPDATE_IMAGE_MUTATION from './UpdateImage.graphql';
import CHANGE_STATE_MUTATION from './ChangeState.graphql';
import JsonLd from '../../JsonLd';
import { compose } from 'recompose';
import { Mutation } from 'react-apollo';
import { MarketListing, MarketListingState } from '../../../types/market';
import Deckchair from '~components/Deckchair';
import { ImageUpload } from '~components/bookmarket/ImageUpload';
import { AspectRatio, OneImage } from '~components/OneImage';
import {
  currentUserData,
  CurrentUserProps,
} from '~components/bookmarket/currentUserData';
import Helmet from 'react-helmet';
import { formatPrice } from '~components/bookmarket/utils';
import { HandledQuery } from '~components/HandledQuery';

interface OwnProps extends RouteComponentProps<{ listingId: string }> {
  updateImage(data: any): Promise<{}>;
  changeState(data: any): Promise<{}>;
  requestContactDetails(data: any): Promise<{}>;
  currentUser: any;
}

interface Result {
  marketListing: MarketListing;
}

type IProps = OwnProps & CurrentUserProps;

class GetListingQuery extends HandledQuery<Result, { listingId: number }> {}

const BookDetailComponent: React.SFC<IProps> = (props: IProps) => {
  const listing = props.data.marketListing;

  const isOwner =
    props.isAuthenticated &&
    props.currentUser &&
    listing.listingUser.userId === props.currentUser.userId;

  function renderListingManagement() {
    return (
      <div>
        {listing.state === MarketListingState.Draft ? (
          <Deckchair
            header="This is a draft"
            about="You need to publish your listing students can see it!"
            color="red"
          >
            <button
              onClick={() =>
                props.changeState({
                  variables: {
                    listingId: listing.pk,
                    state: MarketListingState.Ready,
                  },
                })
              }
              type="button"
              className="Deckchair__button"
            >
              Publish
            </button>
          </Deckchair>
        ) : null}
        {listing.state === MarketListingState.Ready ? (
          <Deckchair
            header="This listing is live!"
            about="Sold the book?"
            color="green"
          >
            <button
              onClick={() =>
                props.changeState({
                  variables: {
                    listingId: listing.pk,
                    state: MarketListingState.Unlisted,
                  },
                })
              }
              type="button"
              className="Deckchair__button"
            >
              Unlist
            </button>
          </Deckchair>
        ) : null}
        {listing.state === MarketListingState.Unlisted ? (
          <Deckchair
            header="This listing unlisted"
            about="Still want to sell it? Simply relist it!"
            color="blue"
          >
            <button
              onClick={() =>
                props.changeState({
                  variables: {
                    listingId: listing.pk,
                    state: MarketListingState.Ready,
                  },
                })
              }
              type="button"
              className="Deckchair__button"
            >
              Relist
            </button>
          </Deckchair>
        ) : null}{' '}
        {listing.state === MarketListingState.Expired ? (
          <Deckchair
            header="This listing un-listed"
            about="Still want to sell it? Simply re-list it!"
            color="blue"
          >
            <button
              onClick={() =>
                props.changeState({
                  variables: {
                    listingId: listing.pk,
                    state: MarketListingState.Ready,
                  },
                })
              }
              type="button"
              className="Deckchair__button"
            >
              Relist
            </button>
          </Deckchair>
        ) : null}
      </div>
    );
  }

  function renderAddImage() {
    return (
      <Deckchair
        header="Let's add an image"
        about="Take a photo directly from your phone, or drag and drop an image"
        color="red"
      />
    );
  }

  const ldData: any = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: listing.bookTitle,
    description: listing.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: listing.buyPrice,
      itemCondition: 'http://schema.org/UsedCondition',
      availability: 'http://schema.org/InStock',
    },
  };

  if (listing.image) {
    ldData.image = [
      `https://su.imgix.net/${
        listing.image.resource
      }?w=800&fit=crop&crop=focal&auto=format`,
    ];
  }

  return (
    <div>
      <Helmet title={listing.bookTitle}>
        <meta
          name="description"
          content={`${listing.bookTitle} by ${
            listing.bookAuthor
          } is on the Sussex Book Market`}
        />
      </Helmet>
      <JsonLd data={ldData} />
      <BreadcrumbBar>
        <Link to="/book-market/">Book Market</Link>
        <Link
          to={`/book-market/section/${listing.section && listing.section.slug}`}
        >
          {listing.section.title}
        </Link>
        <Link to={`/book-market/listing/${listing.pk}`}>
          {listing.bookTitle}
        </Link>
      </BreadcrumbBar>
      {isOwner
        ? listing.image ? renderListingManagement() : renderAddImage()
        : null}
      <div className="Layout Layout--sidebar-right Layout--sidebar-thin">
        <div className="Listing__book">
          <div className="Listing__image">
            {isOwner ? (
              <ImageUpload
                image={listing.image}
                onUploadComplete={(data) => {
                  console.log(data);
                  props.updateImage({
                    variables: {
                      listingId: listing.pk,
                      imageId: data.mediaId,
                    },
                  });
                }}
              />
            ) : listing.image ? (
              <OneImage
                src={listing.image.resource}
                alt=""
                aspectRatio={AspectRatio.r3by4}
              />
            ) : null}
          </div>
          <div className="Listing__book-info">
            <h1 className="Listing__book-title">{listing.bookTitle}</h1>
            <h2 className="Listing__book-author">{listing.bookAuthor}</h2>
            <div>{listing.description}</div>
          </div>
        </div>
        <div>
          <div className="Listing__price">
            {listing.buyPrice === 0
              ? 'Free!'
              : `£${formatPrice(listing.buyPrice)}`}
          </div>

          {props.isAuthenticated ? (
            listing.contactDetails === null ? (
              <button
                className="Button"
                type="button"
                onClick={() =>
                  props.requestContactDetails({
                    variables: { listingId: listing.pk },
                  })
                }
              >
                Get book!
              </button>
            ) : (
              <div className="Listing__contact">
                <div className="Listing__contact-heading">Contact details:</div>
                <div className="Listing__contact-details">
                  {listing.contactDetails}
                </div>
              </div>
            )
          ) : (
            <em>Log in to get book</em>
          )}

          <div className="Listing__lister">
            Listed by {listing.listingUser.name}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookDetailConnector: React.SFC<IProps> = (props: IProps) => {
  return (
    <GetListingQuery
      query={GET_LISTING_QUERY}
      variables={{
        listingId: parseInt(props.match.params.listingId, 10),
      }}
    >
      {({ data }) => (
        <Mutation mutation={CHANGE_STATE_MUTATION}>
          {({ changeState }) => (
            <Mutation mutation={UPDATE_IMAGE_MUTATION}>
              {({ updateImage }) => (
                <Mutation mutation={REQUEST_CONTACT_DETAILS_MUTATION}>
                  {({ requestContactDetails }) => {
                    if (!data) {
                      return;
                    }

                    return (
                      <BookDetailComponent
                        data={data}
                        changeState={changeState}
                        updateImage={updateImage}
                        requestContentDetails={requestContactDetails}
                      />
                    );
                  }}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </GetListingQuery>
  );
};

const BookDetail = compose<OwnProps, IProps>(currentUserData())(
  BookDetailConnector as any,
);

export { BookDetail };
