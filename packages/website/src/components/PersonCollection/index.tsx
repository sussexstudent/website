import React from 'react';
import {
  PersonCollectionFigure,
  FigureData,
} from '../PersonCollection/PersonCollectionFigure';

interface PersonCollectionProps {
  items?: FigureData[];
  size?: 'small' | 'medium' | 'big';
}

export const PersonCollection: React.FC<PersonCollectionProps> = ({
  children,
  items = null,
}) => (
  <ul className={`PersonCollection`}>
    {items === null
      ? children
      : items.map((item) => (
          <PersonCollectionFigure key={item.link} {...item} />
        ))}
  </ul>
);
