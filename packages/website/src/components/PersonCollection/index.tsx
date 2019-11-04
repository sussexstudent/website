import React from 'react';
import {
  PersonCollectionFigure,
  FigureData,
} from '../PersonCollection/PersonCollectionFigure';

interface IProps {
  items?: FigureData[];
  size?: 'small' | 'medium' | 'big';
}

export const PersonCollection: React.FC<IProps> = ({
  children,
  items = null,
}) => (
  <ul className={`PersonCollection`}>
    {items === null
      ? children
      : items.map((item) => <PersonCollectionFigure {...item} />)}
  </ul>
);
