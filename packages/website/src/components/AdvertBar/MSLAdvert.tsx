import React from 'react';
import MSLTag from '../MSLTag';

interface MSLAdvertProps {
  position: string;
}

export const MSLAdvert = ({ position }: MSLAdvertProps) => (
  <div
    className="AdvertBar__advert"
    dangerouslySetInnerHTML={{
      __html: MSLTag('Advert', { Position: position }),
    }}
  />
);
