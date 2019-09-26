import React from 'react';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import REQUEST_CONTACT_DETAILS_MUTATION from './RequestContactDetails.graphql';
import GET_LISTING_QUERY from './GetListing.graphql';
import UPDATE_IMAGE_MUTATION from './UpdateImage.graphql';
import { JsonLd } from '../../../components/JsonLd';
import { MarketListing } from '@ussu/common/src/types/market';
import { Deckchair } from '../../../components/Deckchair';
import { ImageUpload } from '../ImageUpload';
import { AspectRatio, OneImage } from '../../../components/OneImage';
import { useViewer } from '../currentUserData';
import Helmet from 'react-helmet';
import { OwnerStatusBanner } from './OwnerStatusBanner';
import { formatPrice } from '@ussu/common/src/libs/money';
import { InternalAppLink } from '../../../components/InternalAppLink';
import { RouteComponentProps } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Loader } from '../../../components/Loader';

export interface BookDetailProps
  extends RouteComponentProps<{ listingId: string }> {}

interface Result {
  marketListing: MarketListing;
}

const BookDetail: React.FC<BookDetailProps> = (props) => {
  const [updateImage] = useMutation(UPDATE_IMAGE_MUTATION);
  const [requestContactDetails] = useMutation(REQUEST_CONTACT_DETAILS_MUTATION);
  const { loading: viewerLoading, isAuthenticated, currentUser } = useViewer();
  const { data, loading } = useQuery<Result>(GET_LISTING_QUERY, {
    variables: {
      listingId: parseInt(props.match.params.listingId, 10),
    },
  });

  if (viewerLoading || loading || !data) {
    return <Loader />;
  }

  const listing = data.marketListing;

  const isOwner =
    isAuthenticated &&
    currentUser &&
    listing.listingUser.userId === currentUser.userId;

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
      `https://su.imgix.net/${listing.image.resource}?w=800&fit=crop&crop=focal&auto=format`,
    ];
  }

  return (
    <div>
      <Helmet title={listing.bookTitle}>
        <meta
          name="description"
          content={`${listing.bookTitle} by ${listing.bookAuthor} is on the Sussex Book Market`}
        />
      </Helmet>
      <JsonLd data={ldData} />
      <BreadcrumbBar>
        <InternalAppLink to="/book-market/">Book Market</InternalAppLink>
        <InternalAppLink
          to={`/book-market/section/${listing.section && listing.section.slug}`}
        >
          {listing.section.title}
        </InternalAppLink>
        <InternalAppLink to={`/book-market/listing/${listing.pk}`}>
          {listing.bookTitle}
        </InternalAppLink>
      </BreadcrumbBar>
      {isOwner ? (
        listing.image ? (
          <OwnerStatusBanner listingId={listing.pk} state={listing.state} />
        ) : (
          renderAddImage()
        )
      ) : null}
      <div className="Layout Layout--sidebar-right Layout--sidebar-thin">
        <div className="Listing__book">
          <div className="Listing__image">
            {isOwner ? (
              <ImageUpload
                image={listing.image}
                onUploadComplete={(data) => {
                  updateImage({
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

          {isAuthenticated ? (
            listing.contactDetails === null ? (
              <button
                className="Button"
                type="button"
                onClick={() =>
                  requestContactDetails({
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

export { BookDetail };
