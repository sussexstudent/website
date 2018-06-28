import React from 'react';
import bind from 'bind-decorator';
import { GranuleQuery } from '~components/Query';
import OFFERS_QUERY from './OffersQuery.graphql';
import { GranuleChildProps } from '@brudil/granule';
import { Offer } from '../../types/commercial';
import HydroLeaf from '~components/HydroLeaf';
import Loader from '~components/Loader';
import { AspectRatio, OneImage } from '~components/OneImage';
import PatternPlaceholder from '~components/PatternPlaceholder';
import StreamField from '~website/containers/content/StreamField';
import Button from '~components/Button';
import { Modal } from '~components/Modal';

interface Result {
  allOffers: Offer[];
}

interface OffersState {
  openOffer: number;
}

class Offers extends React.Component<{}, OffersState> {
  state = {
    openOffer: -1,
  };

  @bind
  handleClose() {
    this.setState({ openOffer: -1 });
  }

  @bind
  handleOpenOffer(offerIndex: number) {
    this.setState({ openOffer: offerIndex });
  }

  render() {
    return (
      <GranuleQuery query={OFFERS_QUERY}>
        {({ data, loading }: GranuleChildProps<Result>) => {
          if (!data || loading) {
            return <Loader />;
          }

          return (
            <div>
              <ul className="List List--reset OrgansiationGrid">
                {data.allOffers.map((offer, index) => (
                  <li className="OrganisationCard">
                    <div
                      className="OrganisationCard__link"
                      onClick={this.handleOpenOffer.bind(this, index)}
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
                        <h3 className="OrganisationCard__title">
                          {offer.companyName}
                        </h3>
                        <h3 className="OrganisationCard__description">
                          {offer.dealTag}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {this.state.openOffer >= 0 ? (
                <Modal
                  isOpen={this.state.openOffer !== null}
                  onRequestClose={this.handleClose}
                  footerClose
                >
                  <h1>{data.allOffers[this.state.openOffer].companyName}</h1>
                  <h2>{data.allOffers[this.state.openOffer].dealTag}</h2>
                  {data.allOffers[this.state.openOffer].companyWebsite ? (
                    <Button
                      href={data.allOffers[this.state.openOffer].companyWebsite}
                    >
                      View website >
                    </Button>
                  ) : null}
                  <StreamField
                    page={{}}
                    items={data.allOffers[this.state.openOffer].main}
                  />
                </Modal>
              ) : null}
            </div>
          );
        }}
      </GranuleQuery>
    );
  }
}

export default HydroLeaf({ name: 'Offers' })(Offers);
