import React from 'react';
import { SocialArray } from '../../../website/src/components/SocialArray/index';

export default { title: 'SocialArray' };

export const Standard = () => (
  <SocialArray
    networks={{
      twitter: {
        name: '@example',
        link: 'http://twitter.com/example',
      },
      facebook: {
        name: '@example',
        link: '#',
      },
      instagram: {
        name: '@example',
        link: '#',
      },
      snapchat: {
        name: '@example',
        link: '#',
      },
      linkedin: {
        name: '@example',
        link: '#',
      },
      website: {
        name: '@example',
        link: '#',
      },
    }}
  />
);
