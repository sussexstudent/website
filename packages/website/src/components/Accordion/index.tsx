import React from 'react';
import {
  AccordionItemInternal,
  AccordionItemProps,
} from './AccordionItem';

interface AccordionProps {
  children: (React.ReactElement<AccordionItemProps> | null)[];
  className: string;
}

interface AccordionState {
  openArea: null | string;
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {
  state = {
    openArea: null,
  };

  render() {
    const { children, className } = this.props;
    const { openArea } = this.state;

    return (
      <ul className={className}>
        {children.map((item) =>
          item === null ? null : (
            <AccordionItemInternal
              className={className}
              key={item.props.name}
              {...item.props}
              isOpen={openArea === item.props.name}
              onOpen={() =>
                this.setState(({ openArea }) => ({
                  openArea:
                    openArea === item.props.name ? null : item.props.name,
                }))
              }
            />
          ),
        )}
      </ul>
    );
  }
}
