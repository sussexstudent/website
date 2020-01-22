import React from 'react';
import { MSLTag } from '../MSLTag';

interface MSLAdvertProps {
  position: string;
}

export const MSLAdvert: React.FC<MSLAdvertProps> = ({ position }) => (
  <div
    className="AdvertBar__advert"
    dangerouslySetInnerHTML={{
      __html: MSLTag('Advert', { Position: position }),
    }}
  />
);
