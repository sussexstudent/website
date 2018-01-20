import React from 'react';
import FigureCollectionFigure, { FigureData } from './FigureCollectionFigure';

interface IProps {
  items?: Array<FigureData>;
}

const FigureCollection: React.SFC<IProps> = ({ children, items = null }) => (
  <ul className="FigureCollection">
    {items === null
      ? children
      : items.map((item) => <FigureCollectionFigure {...item} />)}
  </ul>
);

export default FigureCollection;
