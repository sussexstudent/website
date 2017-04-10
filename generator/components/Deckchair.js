import React from 'react';

const Deckchair = ({ header, about, buttonTitle, buttonAction, buttonLink, chairKey, color }) => (
  <div className={`Deckchair Deckchair--color-${color}`} data-chair={chairKey}>
    {chairKey ? <div className="Deckchair__close" /> : null}
    <div className="Deckchair__info">
      <h3 className="Deckchair__header">{header}</h3>
      <p className="Deckchair__about">{about}</p>
    </div>
    <div className="Deckchair__cta">
      <a className="Deckchair__button" href={buttonLink} data-action={buttonAction}>{buttonTitle}</a>
    </div>
  </div>
);

Deckchair.propTypes = {
  header: React.PropTypes.string.isRequired,
  about: React.PropTypes.string.isRequired,
  buttonTitle: React.PropTypes.string.isRequired,
  buttonAction: React.PropTypes.string.isRequired,
  buttonLink: React.PropTypes.string.isRequired,
  chairKey: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
};

export default Deckchair;

