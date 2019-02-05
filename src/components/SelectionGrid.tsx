import React from 'react';

interface IProps {
  children: any;
}

const SelectionGrid = ({ children }: IProps) => (
  <ul className="SelectionGrid TrailGrid TrailGrid--three">{children}</ul>
);

export default SelectionGrid;
