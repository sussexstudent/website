import React from 'react';
import FauxRouterLink from "~components/FauxRouterLink";
import {MarketListing} from "../../../types/market";

interface IProps {
  items: MarketListing[];
  ownUser?: boolean;
}

const ListingList: React.SFC<IProps> = (props: IProps) => {
  if (props.items.length <= 0) {
    return <h2>No items found!</h2>
  }


  return (
    <ul className="ListingList List--reset">
      {props.items.map(item => (
        <li className="ListingList__item">
          <FauxRouterLink href={`/book-market/listing/${item.pk}`} />
            <div className="ListingList__image">
              image
            </div>
            <div className="ListingList__info">
              <div className="ListingList__title">{item.bookTitle}{props.ownUser ? `[${item.state}]` : null}</div>
              <div className="ListingList__author">{item.bookAuthor}</div>
            </div>
            <div className="ListingList__actionable">
              <h2>{item.buyPrice === 0 ? 'Free!' :  `£${item.buyPrice}`}</h2>
            </div>
        </li>
      ))}
    </ul>
  );
};

export { ListingList };
