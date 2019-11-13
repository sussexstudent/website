import React from 'react';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import { COLORS } from '@ussu/basil/src/style';

interface EventSidebarSection {
  heading: string;
}

export const EventSidebarSection: React.FC<EventSidebarSection> = ({
  heading,
  children,
}) => (
  <div
    css={{
      marginBottom: '0.5rem',
      paddingTop: '0.5rem',
    }}
  >
    <h4
      css={[
        type(TypeSize.Brevier, Typeface.Secondary),
        {
          textTransform: 'uppercase',
          color: COLORS.GREY_WINTER,
          margin: 0,
          marginBottom: '0.25rem',
        },
      ]}
    >
      {heading}
    </h4>
    <div
      css={[
        type(TypeSize.Pica, Typeface.Secondary),
        {
          fontWeight: 600,
          padding: 0,
          margin: 0,
          listStyle: 'none',
        },
      ]}
    >
      {children}
    </div>
  </div>
);
