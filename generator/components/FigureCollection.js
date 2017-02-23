import React from 'react';

const FigureCollection = ({ children }) => (
  <ul className="FigureCollection">
    {children}
  </ul>
);

FigureCollection.propTypes = {
  children: React.PropTypes.node.isRequired,
};

FigureCollection.ui = {
  children: {
    allowed: ['FigureCollectionFigure'],
  },
};

export default FigureCollection;
