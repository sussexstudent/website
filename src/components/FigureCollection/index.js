import React from 'react';
import FigureCollectionFigure from './FigureCollectionFigure';

const FigureCollection = ({ children, items = null }) => (
  <ul className="FigureCollection">
    {items === null
      ? children
      : items.map(item => <FigureCollectionFigure {...item} />)}
  </ul>
);

FigureCollection.Figure = FigureCollectionFigure;

export default FigureCollection;
