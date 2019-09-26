import React from 'react';
import { MarketListingState } from '@ussu/common/src/types/market';
import CHANGE_STATE_MUTATION from './ChangeState.graphql';
import Deckchair from '../../../components/Deckchair';
import { useMutation } from '@apollo/react-hooks';

interface OwnerStatusBannerProps {
  state: MarketListingState;
  listingId: number;
}

export function OwnerStatusBanner({
  state,
  listingId,
}: OwnerStatusBannerProps) {
  const [changeState] = useMutation(CHANGE_STATE_MUTATION);

  return (
    <div>
      {state === MarketListingState.Draft ? (
        <Deckchair
          header="This is a draft"
          about="You need to publish your listing so students can see it!"
          color="red"
        >
          <button
            onClick={() =>
              changeState({
                variables: {
                  listingId,
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
      {state === MarketListingState.Ready ? (
        <Deckchair
          header="This listing is live!"
          about="Sold the book?"
          color="green"
        >
          <button
            onClick={() =>
              changeState({
                variables: {
                  listingId,
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
      {state === MarketListingState.Unlisted ? (
        <Deckchair
          header="This listing unlisted"
          about="Still want to sell it? Simply relist it!"
          color="blue"
        >
          <button
            onClick={() =>
              changeState({
                variables: {
                  listingId,
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
      {state === MarketListingState.Expired ? (
        <Deckchair
          header="This listing un-listed"
          about="Still want to sell it? Simply re-list it!"
          color="blue"
        >
          <button
            onClick={() =>
              changeState({
                variables: {
                  listingId,
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
