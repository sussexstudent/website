import React from 'react';
import LazyLoad from 'react-lazyload';

function OrganisationCard(props) {
  const org = props.org;
  return (
    <li className="OrganisationCard">
      <a className="OrganisationCard__link" href={org.link}>
        <LazyLoad height={200} offset={400} once>
          <img className="OrganisationCard__image" src={org.image.src} role="presentation" />
        </LazyLoad>
        <div className="OrganisationCard__info">
          <h3 className="OrganisationCard__title">{org.name}</h3>
          {org.description ? <p className="OrganisationCard__description">{org.description}</p> : null}
        </div>
      </a>
    </li>
  );
}

OrganisationCard.propTypes = {
  org: React.PropTypes.shape({
    link: React.PropTypes.string,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    image: React.PropTypes.shape({
      src: React.PropTypes.string,
    }),
  }),
};

export default OrganisationCard;
