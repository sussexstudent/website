import React from 'react';
import { GranuleQuery } from '~components/Query';
import OFFERS_QUERY from './OffersQuery.graphql';
import { GranuleChildProps } from '@brudil/granule';
import { Offer } from '../../types/commercial';
import HydroLeaf from '~components/HydroLeaf';
import Loader from '~components/Loader';

interface Result {
  allOffers: Offer[];
}

function Offers() {
  return (
    <GranuleQuery query={OFFERS_QUERY}>
      {({ data, loading }: GranuleChildProps<Result>) => {
        if (!data || loading) {
          return <Loader />;
        }

        return (
          <div>
            <h1>Offers</h1>
            <ul className="List List--reset OrgansiationGrid">
              {data.allOffers.map((offer) => (
                <li className="OrganisationCard">
                  <a className="OrganisationCard__link" href="">
                    <div className="OrganisationCard__info">
                      <h3 className="OrganisationCard__title">
                        {offer.companyName}
                      </h3>
                      <h3 className="OrganisationCard__description">
                        {offer.dealTag}
                      </h3>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </GranuleQuery>
  );
}

export default HydroLeaf({ name: 'Offers' })(Offers);
