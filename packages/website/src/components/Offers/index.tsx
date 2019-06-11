import React, { useState } from 'react';
import OFFERS_QUERY from './OffersQuery.graphql';
import { Offer } from '@ussu/common/src/types/commercial';
import Loader from '../Loader';
import { AspectRatio, OneImage } from '../OneImage';
import PatternPlaceholder from '../PatternPlaceholder';
import StreamField from '../../containers/content/StreamField';
import Button from '../Button';
import { Modal } from '../Modal';
import { useQuery } from 'react-apollo-hooks';

interface Result {
  allOffers: Offer[];
}

const Offers: React.FC = () => {
  const [openOffer, setOpenOffer] = useState(-1);
  const { data, loading } = useQuery<Result>(OFFERS_QUERY);

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <div>
      <ul className="List List--reset OrganisationGrid">
        {data.allOffers.map((offer, index) => (
          <li className="OrganisationCard">
            <div
              className="OrganisationCard__link"
              onClick={() => setOpenOffer(index)}
            >
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
                <h3 className="OrganisationCard__title">{offer.companyName}</h3>
                <h3 className="OrganisationCard__description">
                  {offer.dealTag}
                </h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {openOffer >= 0 ? (
        <Modal
          isOpen={openOffer !== null}
          onRequestClose={() => setOpenOffer(-1)}
          footerClose
        >
          <h1>{data.allOffers[openOffer].companyName}</h1>
          <h2>{data.allOffers[openOffer].dealTag}</h2>
          {data.allOffers[openOffer].companyWebsite ? (
            <Button href={data.allOffers[openOffer].companyWebsite}>
              View website >
            </Button>
          ) : null}
          <StreamField page={{}} items={data.allOffers[openOffer].main} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Offers;
