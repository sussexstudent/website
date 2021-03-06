import React from 'react';
import { PatternPlaceholder } from '../PatternPlaceholder';
import { AspectRatio, OneImage } from '../OneImage';
import { StudentGroupFragmentFragment } from '../../generated/graphql';

interface OrganisationCardProps {
  org: StudentGroupFragmentFragment;
}

export const OrganisationCard: React.FC<OrganisationCardProps> = ({ org }) => {
  return (
    <li className="TrailGrid__item">
      <a className="OrganisationCard__link" href={org.link || '#'}>
        {org.logo !== null ? (
          <div className="OrganisationCard__image-container">
            <OneImage
              className="OrganisationCard__image"
              aspectRatio={AspectRatio.r16by9}
              src={org.logo.resource}
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
};
