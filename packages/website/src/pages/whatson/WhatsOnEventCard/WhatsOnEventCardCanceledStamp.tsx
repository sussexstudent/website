import React from 'react';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';

export const WhatsOnEventCardCanceledStamp: React.FC = () => (
  <div
    css={[
      type(TypeSize.Trafalgar, Typeface.Secondary),
      {
        color: '#ff4144aa',
        position: 'absolute',
        textTransform: 'uppercase',
        fontWeight: 800,
        top: 80,
        left: 0,
        right: 0,
        textAlign: 'center',
        transform: 'rotate(13deg)',
        zIndex: 1,
      },
    ]}
  >
    Cancelled
  </div>
);
