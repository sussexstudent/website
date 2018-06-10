import React from 'react';

export const SectionbarItem: React.SFC = (props) => (
  <li className="Sectionbar__menu-item">{props.children}</li>
);

interface SectionbarProps {
  title: string;
}

export const Sectionbar: React.SFC<SectionbarProps> = (props) => {
  return (
    <div className="Sectionbar">
      <div className="LokiContainer Sectionbar__container">
        <h2 className="Sectionbar__title">{props.title}</h2>

        <ul className="Sectionbar__menu type-pica">
          {props.children}
        </ul>
      </div>
    </div>
  );
};
