import React from 'react';
import {MarketListingState} from "../../../types/market";
import CHANGE_STATE_MUTATION from './ChangeState.graphql';
import Deckchair from "~components/Deckchair";
import {Mutation} from 'react-apollo';

interface IProps {
  state: MarketListingState;
  listingId: number;
}
class ChangeStateMutation extends Mutation<{ changeState(data: any): Promise<{}> }> {}

export function OwnerStatusBanner({ state, listingId }: IProps) {
  return (
    <ChangeStateMutation mutation={CHANGE_STATE_MUTATION}>
      {(changeState) => (

        <div>
      {state === MarketListingState.Draft ? (
        <Deckchair
          header="This is a draft"
          about="You need to publish your listing students can see it!"
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
        )}
    </ChangeStateMutation>
  );
}
