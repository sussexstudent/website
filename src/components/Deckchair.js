import React from 'react';
import PropTypes from 'prop-types';

const Deckchair = ({
  header,
  about,
  buttonTitle,
  buttonAction,
  buttonLink,
  chairKey,
  color,
}) =>
  <div className={`Deckchair Deckchair--color-${color}`} data-chair={chairKey}>
    {chairKey ? <div className="Deckchair__close" /> : null}
    <div className="Deckchair__info">
      <h3 className="Deckchair__header">
        {header}
      </h3>
      <p className="Deckchair__about">
        {about}
      </p>
    </div>
    <div className="Deckchair__cta">
      <a
        className="Deckchair__button"
        href={buttonLink}
        data-action={buttonAction}
      >
        {buttonTitle}
      </a>
    </div>
  </div>;

Deckchair.propTypes = {
  header: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonAction: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  chairKey: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Deckchair;
