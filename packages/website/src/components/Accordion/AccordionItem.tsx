import React from 'react';

export interface AccordionItemProps {
  title: any;
  name: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = () => {
  return null;
};

interface AccordionItemInternalProps {
  isOpen: boolean;
  onOpen(): void;
  className: string;
}

export const AccordionItemInternal: React.FC<AccordionItemProps &
  AccordionItemInternalProps> = (props) => {
  return (
    <li className={`${props.className}__item`}>
      {props.title({
        className: `${props.className}__item-title`,
        onClick: () => props.onOpen(),
      })}
      {props.isOpen ? (
        <div className={`${props.className}__item-content`}>
          {props.children}
        </div>
      ) : null}
    </li>
  );
};
