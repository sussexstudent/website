import React from 'react';
import { WhatsOnBrandedComponentLocation } from './locations';

export const whatsOnBrandingMap: {
  [slug: string]: { [location: number]: React.FC };
} = {
  'freshers-week-2019': {
    [WhatsOnBrandedComponentLocation.Container]: ({ children }) => (
      <div
        css={{
          backgroundImage: `url(${require('../../../img/freshers-2019/repeatable-bg-left.svg')}), url(${require('../../../img/freshers-2019/repeatable-bg-right.svg')})`,
          backgroundRepeat: 'repeat-y, repeat-y',
          backgroundPosition: 'top left, top right',
        }}
      >
        {children}
      </div>
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
