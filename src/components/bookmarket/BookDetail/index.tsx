import React from 'react';
import {BreadcrumbBar} from "~components/BreadcrumbBar";
import {Link, RouteComponentProps} from 'react-router-dom';

import GetListing from './GetListing.graphql';
import {compose} from 'recompose';
import {graphql, ChildProps} from 'react-apollo';
import Loader from "~components/Loader";
import {MarketListing, MarketListingState} from "../../../types/market";
import Deckchair from "~components/Deckchair";
import {ImageUpload} from "~components/bookmarket/ImageUpload";

interface OwnProps extends RouteComponentProps<{ listingId: string }> {

}

interface Result {
  marketListing: MarketListing,
}

type IProps = OwnProps & ChildProps<{}, Result>

const BookDetailComponent: React.SFC<IProps> = (props: IProps) => {
  if (props.data && props.data.loading) {
    return <Loader />
  }

  if (!props.data || !props.data.marketListing) {
    return <h1>Error</h1>;
  }

  const listing = props.data.marketListing;

  return (
    <div>
      <BreadcrumbBar>
        <Link to="/book-market/">Book Market</Link>
        <Link to={`/book-market/section/${listing.section && listing.section.slug}`}>{listing.section.title}</Link>
        <Link to={`/book-market/listing/${listing.pk}`}>{listing.bookTitle}</Link>
      </BreadcrumbBar>
      {listing.state === MarketListingState.Draft ? <Deckchair header="This is a draft" about="You need to publish your listing students can see it!" color="red">
        <button>Publish</button>
      </Deckchair> : null}
      {listing.state === MarketListingState.Ready ? <Deckchair header="This listing is live!" about="Sold the book?" color="green">
        <button>Un-list</button>
      </Deckchair> : null}
      {listing.state === MarketListingState.Unlisted ? <Deckchair header="This listing expired" about="Still want to sell it? Simply re-list it!" color="yellow">
        <button>Re-list</button>
      </Deckchair> : null}
      <div className="Layout Layout--sidebar-right">
        <div className="Listing__book">
          <div className="Listing__image">
            <span>picture</span>
          </div>
          <div className="Listing__book-info">
            <h1 className="Listing__book-title">{listing.bookTitle}</h1>
            <h2 className="Listing__book-author">{listing.bookAuthor}</h2>
            <div>
              {listing.description}
            </div>
          </div>
        </div>
        <div>
          <h2>{listing.buyPrice === 0 ? 'Free!' :  `£${listing.buyPrice}`}</h2>
          <button className="Button">Get book!</button>

          <div className="Listing__lister">
            Listed by
            James Canning
          </div>
        </div>
      </div>

      <ImageUpload />
    </div>
  );
};

const BookDetail = compose<OwnProps, IProps>(
  graphql<Result, IProps>(GetListing, {
    options: props => {
      return ({
        variables: {
          listingId: parseInt(props.match.params.listingId, 10),
        }
      });
    }
  })
)(BookDetailComponent);

export { BookDetail };
