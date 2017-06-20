import React from 'react';
import PropTypes from 'prop-types';
import FigureCollectionFigure from './FigureCollectionFigure';

const FigureCollection = ({ items }) =>
  <ul className="FigureCollection">
    {items.map(item => <FigureCollectionFigure {...item} />)}
  </ul>;

FigureCollection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(FigureCollection.propTypes))
    .isRequired,
};

export default FigureCollection;
