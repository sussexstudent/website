import React from 'react';

interface SelectionGridProps {
  children: any;
}

const SelectionGrid = ({ children }: SelectionGridProps) => (
  <ul className="SelectionGrid TrailGrid TrailGrid--three">{children}</ul>
);

export default SelectionGrid;
