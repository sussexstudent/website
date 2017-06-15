import React from 'react';
import PropTypes from 'prop-types';

const SelectionGrid = ({ children }) => (
  <ul className="SelectionGrid">
    {children}
  </ul>
);

SelectionGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

SelectionGrid.ui = {
  children: {
    allowed: ['SelectionGridItem'],
  },
};

export default SelectionGrid;
