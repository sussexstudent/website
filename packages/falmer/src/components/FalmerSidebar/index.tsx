import React from 'react';

interface IProps {}

const FalmerSidebar: React.FC<IProps> = (props) => {
  return <aside className="FalmerSidebar">{props.children}</aside>;
};

export default FalmerSidebar;
