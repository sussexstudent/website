import React from 'react';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link, RouteComponentProps } from 'react-router-dom';
import RequestContactDetails from './RequestContactDetails.graphql';
import GetListing from './GetListing.graphql';
import UpdateImage from './UpdateImage.graphql';
import ChangeState from './ChangeState.graphql';
import { compose } from 'recompose';
import { graphql, ChildProps } from 'react-apollo';
import Loader from '~components/Loader';
import { MarketListing, MarketListingState } from '../../../types/market';
import Deckchair from '~components/Deckchair';
import { ImageUpload } from '~components/bookmarket/ImageUpload';
import { AspectRatio, OneImage } from '~components/OneImage';
import {
  currentUserData,
  CurrentUserProps,
} from '~components/bookmarket/currentUserData';

interface OwnProps extends RouteComponentProps<{ listingId: string }> {
  updateImage(data: any): Promise<{}>;
  changeState(data: any): Promise<{}>;
  requestContactDetails(data: any): Promise<{}>;
  currentUser: any;
}

interface Result {
  marketListing: MarketListing;
}

type IProps = OwnProps & ChildProps<{}, Result> & CurrentUserProps;

const BookDetailComponent: React.SFC<IProps> = (props: IProps) => {
  if (props.data && props.data.loading) {
    return <Loader />;
  }

  if (!props.data || !props.data.marketListing) {
    return <h1>Error</h1>;
  }

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

  return (
    <div>
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
      <div className="Layout Layout--sidebar-right">
        <div className="Listing__book">
          <div className="Listing__image">
            {isOwner ? (
              <ImageUpload
                image={listing.image}
                onUploadComplete={(data) => {
                  console.log(data);
                  props.updateImage({
                    variables: { listingId: listing.pk, imageId: data.mediaId },
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
            {listing.buyPrice === 0 ? 'Free!' : `£${listing.buyPrice}`}
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
              <div>
                <div>Contact details:</div>
                <div>{listing.contactDetails}</div>
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

const BookDetail = compose<OwnProps, IProps>(
  currentUserData(),
  graphql(RequestContactDetails, {
    name: 'requestContactDetails',
  }),
  graphql(UpdateImage, {
    name: 'updateImage',
  }),
  graphql(ChangeState, {
    name: 'changeState',
  }),
  graphql<Result, IProps>(GetListing, {
    options: (props) => {
      return {
        variables: {
          listingId: parseInt(props.match.params.listingId, 10),
        },
      };
    },
  }),
)(BookDetailComponent as any);

export { BookDetail };
