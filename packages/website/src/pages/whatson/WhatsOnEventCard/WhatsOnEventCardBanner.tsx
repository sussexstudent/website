import React from 'react';
import { COLORS } from '@ussu/basil/src/style';

export enum WhatsOnEventCardBannerType {
  Bundle,
  Ticket,
}

export const WhatsOnEventCardBanner: React.FC<{
  type: WhatsOnEventCardBannerType;
}> = ({ type, children }) => (
  <div
    css={{
      color: '#fff',
      fontWeight: 600,
      fontSize: '0.9rem',
      textAlign: 'center',
      display: 'block',
      backgroundColor:
        type === WhatsOnEventCardBannerType.Bundle
          ? '#fbaa05'
          : COLORS.BRAND_GREEN,
    }}
  >
    {children}
  </div>
);
