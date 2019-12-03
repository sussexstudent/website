import React from 'react';

import {
  AspectRatio,
  OneImage,
} from '@ussu/website/src/components/OneImage/index';

export default { title: 'Utils|OneImage' };

export const r16by9 = () => (
  <OneImage
    aspectRatio={AspectRatio.r16by9}
    src="asset/News/6412/unnamed.jpg"
    alt="Alt text"
    mslResource
  />
);

export const r1by1 = () => (
  <OneImage
    aspectRatio={AspectRatio.r1by1}
    src="asset/News/6412/unnamed.jpg"
    alt="Alt text"
    mslResource
  />
);

export const r20by9 = () => (
  <OneImage
    aspectRatio={AspectRatio.r20by9}
    src="asset/News/6412/unnamed.jpg"
    alt="Alt text"
    mslResource
  />
);
export const r3by4 = () => (
  <OneImage
    aspectRatio={AspectRatio.r3by4}
    src="asset/News/6412/unnamed.jpg"
    alt="Alt text"
    mslResource
  />
);
