import React from 'react';
import { Link } from 'react-router-dom';

const FalmerSubSections: React.FC<{}> = (props) => {
  return <ul className="FalmerSubSections">{props.children}</ul>;
};

const FalmerSubSection: React.FC<{ to: string; back?: boolean }> = (props) => {
  return (
    <li className="FalmerSubSections__item">
      <Link to={props.to}>{props.children} »</Link>
    </li>
  );
};

export { FalmerSubSection as SubSection };

export default FalmerSubSections;
