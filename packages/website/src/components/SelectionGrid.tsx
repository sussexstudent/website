import React from 'react';

interface SelectionGridProps {
  children: any;
}

export const SelectionGrid: React.FC<SelectionGridProps> = ({ children }) => (
  <ul className="SelectionGrid List List--reset">{children}</ul>
);
