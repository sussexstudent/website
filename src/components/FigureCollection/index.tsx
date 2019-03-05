import React from 'react';
import FigureCollectionFigure, { FigureData } from './FigureCollectionFigure';

interface IProps {
  items?: FigureData[];
  size?: 'small' | 'medium';
}

const FigureCollection: React.FC<IProps> = ({
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

export default FigureCollection;
