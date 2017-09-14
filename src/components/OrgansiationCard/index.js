import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import PatternPlaceholder from '../PatternPlaceholder';

function OrganisationCard(props) {
  const org = props.org;
  return (
    <li className="OrganisationCard">
      <a className="OrganisationCard__link" href={org.link || '#'}>
        {org.logo !== null ? (
          <div className="OrganisationCard__image-container">
            <Image
              className="OrganisationCard__image"
              fit="clip"
              width={416}
              height={234}
              src={org.logo.resource}
              alt=""
              lazy
            />
          </div>
        ) : (
          <div className="OrganisationCard__image-container">
            <PatternPlaceholder />
          </div>
        )}
        {org.isProspective ? (
          <div className="OrganisationCard__banner">
            Application in progress
          </div>
        ) : null}
        <div className="OrganisationCard__info">
          <h3 className="OrganisationCard__title">{org.name}</h3>
          {org.description ? (
            <p className="OrganisationCard__description">{org.description}</p>
          ) : null}
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
