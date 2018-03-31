import React from 'react';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link, RouteComponentProps } from 'react-router-dom';
import REQUEST_CONTACT_DETAILS_MUTATION from './RequestContactDetails.graphql';
import GET_LISTING_QUERY from './GetListing.graphql';
import UPDATE_IMAGE_MUTATION from './UpdateImage.graphql';
import JsonLd from '../../JsonLd';
import { compose } from 'recompose';
import { Mutation } from 'react-apollo';
import { MarketListing } from '../../../types/market';
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
import {OwnerStatusBanner} from "~components/bookmarket/BookDetail/OwnerStatusBanner";

interface OwnProps extends RouteComponentProps<{ listingId: string }> {
  updateImage(data: any): Promise<{}>;
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
        ? listing.image ? <OwnerStatusBanner listingId={listing.pk} state={listing.state} /> : renderAddImage()
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

class UpdateImageMutation extends Mutation<{ updateImage(data: any): Promise<{}> }> {}
class RequestContactDetailsMutation extends Mutation<{ requestContactDetails(data: any): Promise<{}> }> {}

const BookDetailConnector: React.SFC<IProps> = (props: IProps) => {
  return (
    <GetListingQuery
      query={GET_LISTING_QUERY}
      variables={{
        listingId: parseInt(props.match.params.listingId, 10),
      }}
    >
      {({ data }) => (
          <UpdateImageMutation mutation={UPDATE_IMAGE_MUTATION}>
            {(updateImage) => (
              <RequestContactDetailsMutation mutation={REQUEST_CONTACT_DETAILS_MUTATION}>
                {(requestContactDetails) => {
                  if (!data) {
                    return;
                  }

                  return (
                    <BookDetailComponent
                      data={data}
                      updateImage={updateImage}
                      requestContactDetails={requestContactDetails}
                    />
                  );
                }}
              </RequestContactDetailsMutation>
            )}
          </UpdateImageMutation>
      )}
    </GetListingQuery>
  );
};

const BookDetail = compose<OwnProps, IProps>(currentUserData())(
  BookDetailConnector as any,
);

export { BookDetail };
