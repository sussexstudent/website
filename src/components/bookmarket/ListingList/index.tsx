import React from 'react';
import cx from 'classnames';
import FauxRouterLink from '~components/FauxRouterLink';
import {MarketListing, MarketListingState} from '../../../types/market';
import {AspectRatio, OneImage} from "~components/OneImage";

interface IProps {
  items: MarketListing[];
  ownUser?: boolean;
}

const stateLangMap = {
  [MarketListingState.Draft]: 'Draft',
  [MarketListingState.Ready]: 'Live',
  [MarketListingState.Expired]: 'Expired',
  [MarketListingState.Unlisted]: 'Un-listed',
};

const ListingList: React.SFC<IProps> = (props: IProps) => {
  if (props.items.length <= 0) {
    return <h2>No items found!</h2>;
  }

  return (
    <ul className="ListingList List--reset">
      {props.items.map((item) => (
        <li className="ListingList__item">
          <FauxRouterLink href={`/book-market/listing/${item.pk}`} />
          <div className="ListingList__image">
            {item.image ? <OneImage src={item.image.resource} alt="" aspectRatio={AspectRatio.r3by4} /> : null}
          </div>
          <div className="ListingList__info">
            <div className="ListingList__title">
              {item.bookTitle}
              <span className={cx('ListingList__state type-long-primer', {
                'ListingList__state--draft': item.state === MarketListingState.Draft,
                'ListingList__state--ready': item.state === MarketListingState.Ready,
                'ListingList__state--expired': item.state === MarketListingState.Expired,
                'ListingList__state--unlisted': item.state === MarketListingState.Unlisted,
              })}>{props.ownUser ? stateLangMap[item.state] : null}</span>
            </div>
            <div className="ListingList__author">{item.bookAuthor}</div>
          </div>
          <div className="ListingList__actionable">
            <h2>{item.buyPrice === 0 ? 'Free!' : `£${item.buyPrice}`}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { ListingList };
