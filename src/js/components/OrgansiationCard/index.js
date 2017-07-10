import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import Image from '../Image/index';
import PatternPlaceholder from '../PatternPlaceholder/index';

function OrganisationCard(props) {
  const org = props.org;
  return (
    <li className="OrganisationCard">
      <a
        className="OrganisationCard__link"
        href={org.mslGroup && org.mslGroup.link}
      >
        {org.mslGroup && org.mslGroup.logo !== null
          ? <LazyLoad height={200} offset={400} once>
              <div className="OrganisationCard__image-container">
                <Image
                  className="OrganisationCard__image"
                  fit="clip"
                  width={416}
                  height={234}
                  src={org.mslGroup.logo.resource}
                  alt=""
                />
              </div>
            </LazyLoad>
          : <div className="OrganisationCard__image-container">
              <PatternPlaceholder />
            </div>}
        <div className="OrganisationCard__info">
          <h3 className="OrganisationCard__title">
            {org.name}
          </h3>
          {org.mslGroup && org.mslGroup.description
            ? <p className="OrganisationCard__description">
                {org.mslGroup.description}
              </p>
            : null}
        </div>
      </a>
    </li>
  );
}

OrganisationCard.propTypes = {
  org: PropTypes.shape({
    link: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,
};

export default OrganisationCard;
