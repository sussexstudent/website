import React from 'react';

export interface AccordionItemProps {
  title: any;
  name: string;
}

export const AccordionItem: React.SFC<AccordionItemProps> = () => {
  return null;
};

interface AccordionItemInternalProps {
  isOpen: boolean;
  onOpen(): void;
  className: string;
}

export const AccordionItemInternal: React.SFC<
  AccordionItemProps & AccordionItemInternalProps
> = (props) => {
  return (
    <li className={`${props.className}__item`}>
      {props.title({ className: `${props.className}__item-title`, onClick: () => props.onOpen() })}
      {props.isOpen ? <div className={`${props.className}__item-content`}>{props.children}</div> : null}
    </li>
  );
};
