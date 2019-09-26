import React from 'react';

interface IProps {
  header: string;
  about: string;
  chairKey?: string;
  color: string;
  children?: any;
}

export const Deckchair: React.FC<IProps> = ({
  header,
  about,
  chairKey,
  color,
  children,
}: IProps) => (
  <div className={`Deckchair Deckchair--color-${color}`} data-chair={chairKey}>
    {chairKey ? <div className="Deckchair__close" /> : null}
    <div className="Deckchair__info">
      <h3 className="Deckchair__header type-great-primer">{header}</h3>
      <p className="Deckchair__about type-pica">{about}</p>
    </div>
    <div className="Deckchair__right">{children ? children : null}</div>
  </div>
);
