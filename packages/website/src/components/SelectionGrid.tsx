import React from 'react';

interface SelectionGridProps {
  children: any;
}

export const SelectionGrid: React.FC<SelectionGridProps> = ({ children }) => (
  <ul className="SelectionGrid TrailGrid TrailGrid--three">{children}</ul>
);
