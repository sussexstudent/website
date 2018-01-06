import React from 'react';

interface IProps {
  header: string;
  about: string;
  buttonTitle: string;
  buttonAction?: string;
  buttonLink: string;
  chairKey?: string;
  color: string;
}

const Deckchair = ({
  header,
  about,
  buttonTitle,
  buttonLink,
  chairKey,
  color,
}: IProps) => (
  <div className={`Deckchair Deckchair--color-${color}`} data-chair={chairKey}>
    {chairKey ? <div className="Deckchair__close" /> : null}
    <div className="Deckchair__info">
      <h3 className="Deckchair__header">{header}</h3>
      <p className="Deckchair__about">{about}</p>
    </div>
    <div className="Deckchair__cta">
      <a className="Deckchair__button" href={buttonLink}>
        {buttonTitle}
      </a>
    </div>
  </div>
);

export default Deckchair;
