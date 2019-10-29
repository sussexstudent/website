import { storiesOf } from '@storybook/react';
import { PatternPlaceholder } from '../../../website/src/components/PatternPlaceholder';

storiesOf('Organisation Card', module).add('default', () => (
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
));
