import React from 'react';
import FigureCollectionFigure, { FigureData } from './FigureCollectionFigure';

interface IProps {
  items?: FigureData[];
}

const FigureCollection: React.FC<IProps> = ({ children, items = null }) => (
  <ul className="FigureCollection TrailGrid TrailGrid--medium">
    {items === null
      ? children
      : items.map((item) => <FigureCollectionFigure {...item} />)}
  </ul>
);

export default FigureCollection;
