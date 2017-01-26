import React from 'react';

const FigureCollection = ({ children }) => (
  <ul className="FigureCollection">
    {children}
  </ul>
);

FigureCollection.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default FigureCollection;
