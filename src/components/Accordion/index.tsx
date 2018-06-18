import React from 'react';
import { AccordionItemInternal } from '~components/Accordion/AccordionItem';

interface AccordionProps {
  children: any;
  className?: string
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
        {children.map((item: any) => (
          <AccordionItemInternal
            className={className}
            key={item.props.name}
            {...item.props}
            isOpen={openArea === item.props.name}
            onOpen={() =>
              this.setState(({ openArea }) => ({
                openArea: openArea === item.props.name ? null : item.props.name,
              }))
            }
          />
        ))}
      </ul>
    );
  }
}
