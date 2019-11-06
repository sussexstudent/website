import React from 'react';

export const ScrollableSlice: React.FC = ({ children }) => {
  return (
    <div
      css={{
        width: '100%',
        overflowX: 'scroll',
      }}
    >
      <div
        css={{
          display: 'flex',
          minWidth: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};
