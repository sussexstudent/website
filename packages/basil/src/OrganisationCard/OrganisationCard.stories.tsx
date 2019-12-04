import React from 'react';
import { PatternPlaceholder } from '../../../website/src/components/PatternPlaceholder';

export default { title: 'Organisation Card' };

export const Default: React.FC = () => (
  <li className="TrailGrid__item">
    <a className="OrganisationCard__link" href="#">
      <div className="OrganisationCard__image-container">
        <PatternPlaceholder />
      </div>
      <div className="OrganisationCard__info">
        <h3 className="OrganisationCard__title">Organisation name</h3>
        <p className="OrganisationCard__description">Organisaton description</p>
      </div>
    </a>
  </li>
);

export const InProgress: React.FC = () => (
  <li className="TrailGrid__item">
    <a className="OrganisationCard__link" href="#">
      <div className="OrganisationCard__image-container">
        <PatternPlaceholder />
      </div>
      <div className="OrganisationCard__banner">Application in progress</div>
      <div className="OrganisationCard__info">
        <h3 className="OrganisationCard__title">Organisation name</h3>
        <p className="OrganisationCard__description">Organisaton description</p>
      </div>
    </a>
  </li>
);
