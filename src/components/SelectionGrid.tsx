import React from 'react';

interface IProps {
  children: any;
}

const SelectionGrid = ({ children }: IProps) => (
  <ul className="SelectionGrid">{children}</ul>
);

export default SelectionGrid;
