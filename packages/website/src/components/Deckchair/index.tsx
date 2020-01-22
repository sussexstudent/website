import React from 'react';

interface DeckchairProps {
  header: string;
  about: string;
  chairKey?: string;
  color: string;
}

export const Deckchair: React.FC<DeckchairProps> = ({
  header,
  about,
  chairKey,
  color,
  children,
}) => (
  <div className={`Deckchair Deckchair--color-${color}`} data-chair={chairKey}>
    {chairKey ? <div className="Deckchair__close" /> : null}
    <div className="Deckchair__info">
      <h3 className="Deckchair__header type-great-primer">{header}</h3>
      <p className="Deckchair__about type-pica">{about}</p>
    </div>
    <div className="Deckchair__right">{children ? children : null}</div>
  </div>
);
