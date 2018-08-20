import React from 'react';
import { Link } from '@reach/router';

export const SectionbarItem: React.SFC = (props) => (
  <li className="Sectionbar__menu-item">{props.children}</li>
);

interface SectionbarProps {
  title: string;
  titleLink?: string;
}

export const Sectionbar: React.SFC<SectionbarProps> = (props) => {
  return (
    <div className="Sectionbar">
      <div className="LokiContainer Sectionbar__container">
        <h2 className="Sectionbar__title">
          {props.titleLink ? (
            <Link to={props.titleLink}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h2>

        <ul className="Sectionbar__menu type-pica">{props.children}</ul>
      </div>
    </div>
  );
};
