import React from 'react';
import { GranuleQuery } from '~components/Query';
import OFFERS_QUERY from './OffersQuery.graphql';
import { GranuleChildProps } from '@brudil/granule';
import { Offer } from '../../types/commercial';
import HydroLeaf from '~components/HydroLeaf';
import Loader from '~components/Loader';
import { AspectRatio, OneImage } from '~components/OneImage';
import PatternPlaceholder from '~components/PatternPlaceholder';

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
                    {offer.companyLogo !== null ? (
                      <div className="OrganisationCard__image-container">
                        <OneImage
                          className="OrganisationCard__image"
                          aspectRatio={AspectRatio.r16by9}
                          src={offer.companyLogo.resource}
                          alt=""
                          sizes={[416]}
                          mediaSizes="416px"
                          options={{ fit: 'clip' }}
                          withoutContainer
                        />
                      </div>
                    ) : (
                      <div className="OrganisationCard__image-container">
                        <PatternPlaceholder />
                      </div>
                    )}
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
