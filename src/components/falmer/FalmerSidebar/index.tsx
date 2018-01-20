import React from 'react';

interface IProps {}

const FalmerSidebar: React.SFC<IProps> = (props) => {
  return <aside className="FalmerSidebar">{props.children}</aside>;
};

export default FalmerSidebar;
