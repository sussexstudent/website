import React from 'react';

const SelectionGrid = ({ children }) => (
  <ul className="SelectionGrid">
    {children}
  </ul>
);

SelectionGrid.propTypes = {
  children: React.PropTypes.node.isRequired,
};

SelectionGrid.ui = {
  children: {
    allowed: ['SelectionGridItem'],
  },
};

export default SelectionGrid;
