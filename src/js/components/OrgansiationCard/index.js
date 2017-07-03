import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import LazyLoad from 'react-lazyload';

function getImage(org) {
  if (has(org, 'mslGroup.mslImageUrl') && org.mslGroup.mslImageUrl !== '') {
    return org.mslGroup.mslImageUrl;
  }

  return 'https://du9l8eemj97rm.cloudfront.net/6fb8e464446cb1ce250443337dc8ce6c.png';
}

function OrganisationCard(props) {
  const org = props.org;
  return (
    <li className="OrganisationCard">
      <a className="OrganisationCard__link" href={org.link}>
        <LazyLoad height={200} offset={400} once>
          <div className="OrganisationCard__image-container">
            <img
              className="OrganisationCard__image"
              src={getImage(org)}
              alt=""
            />
          </div>
        </LazyLoad>
        <div className="OrganisationCard__info">
          <h3 className="OrganisationCard__title">{org.name}</h3>
          {org.mslGroup && org.mslGroup.mslDescription
            ? <p className="OrganisationCard__description">
                {org.mslGroup.mslDescription}
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
