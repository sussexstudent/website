import React from 'react';
import { WhatsOnBrandedComponentLocation } from './locations';

export const whatsOnBrandingMap: {
  [slug: string]: { [location: number]: React.FC };
} = {
  'freshers-week-2019': {
    [WhatsOnBrandedComponentLocation.Container]: ({ children }) => (
      <div css={{ backgroundColor: 'rgb(250, 208, 15)' }}>{children}</div>
    ),
    [WhatsOnBrandedComponentLocation.PeriodHeader]: ({
      brandingPeriod,
    }: any) => (
      <div>
        <h1 css={{ textTransform: 'uppercase', textAlign: 'center' }}>
          {brandingPeriod.name}
        </h1>
      </div>
    ),
  },
};
