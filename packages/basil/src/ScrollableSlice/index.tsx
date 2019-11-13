import React from 'react';

export const scrollableXStyle: any = {
  minWidth: '100%',

  overflowX: 'scroll',
  display: 'flex',
  scrollSnapType: 'x mandatory',
  scrollPaddingTop: 40,

  '& > *': {
    scrollSnapAlign: 'start',
  },
};

export const ScrollableSlice: React.FC = ({ children }) => {
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',

        overflowX: 'scroll',
        scrollSnapType: 'x mandatory',
        scrollPaddingTop: 40,

        '& > *': {
          scrollSnapAlign: 'start',
        },
      }}
    >
      {children}
    </div>
  );
};
