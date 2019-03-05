import React from 'react';
import {
  PersonCollectionFigure,
  FigureData,
} from '~components/PersonCollection/PersonCollectionFigure';

interface IProps {
  items?: FigureData[];
  size?: 'small' | 'medium';
}

export const PersonCollection: React.FC<IProps> = ({
  children,
  items = null,
  size = 'medium',
}) => (
  <ul className={`PersonCollection TrailGrid TrailGrid--${size}`}>
    {items === null
      ? children
      : items.map((item) => <PersonCollectionFigure {...item} />)}
  </ul>
);
