import React from 'react';
import MSLTag from '../MSLTag';

interface IProps {
  position: string;
}

export const MSLAdvert = ({ position }: IProps) => (
  <div
    className="AdvertBar__advert"
    dangerouslySetInnerHTML={{
      __html: MSLTag('Advert', { Position: position }),
    }}
  />
);
