import React from 'react';

interface IProps {
  isOpen: boolean;
}

export const Accordion: React.FC<IProps> = ({ isOpen }) => {
  return (
    <ul className="ModalAccordion">
      <li className="ModalAccordion__item">
        <button className="ModalAccordion__item-title">Accordion item 1</button>
      </li>
      <li className="ModalAccordion__item">
        <button className="ModalAccordion__item-title">Accordion item 2</button>
        {isOpen ? (
          <div className="ModalAccordion__item-content">
            <ul className="ModalAccordion__content-list">
              <li>Inner item #1</li>
              <li>Inner item #2</li>
            </ul>
          </div>
        ) : null}
      </li>
    </ul>
  );
};
