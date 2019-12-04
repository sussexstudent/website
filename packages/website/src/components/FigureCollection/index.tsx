import React from 'react';
import { FigureCollectionFigure, FigureData } from './FigureCollectionFigure';

interface FigureCollectionProps {
  items?: FigureData[];
  size?: 'small' | 'medium';
}

export const FigureCollection: React.FC<FigureCollectionProps> = ({
  children,
  items = null,
  size = 'medium',
}) => (
  <ul className={`FigureCollection TrailGrid TrailGrid--${size}`}>
    {items === null
      ? children
      : items.map((item) => <FigureCollectionFigure {...item} />)}
  </ul>
);
