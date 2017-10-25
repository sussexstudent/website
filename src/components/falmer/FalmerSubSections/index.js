import React from 'react';
import { Link } from 'react-router-dom';

function FalmerSubSections(props) {
  return <ul className="FalmerSubSections">{props.children}</ul>;
}

function FalmerSubSection(props) {
  return (
    <li className="FalmerSubSections__item">
      <Link to={props.to}>{props.children} »</Link>
    </li>
  );
}

FalmerSubSections.Section = FalmerSubSection;

export default FalmerSubSections;
