import React from 'react';

import { AspectRatio, OneImage } from '@ussu/website/src/components/OneImage';

export default { title: 'Utils|OneImage' };
const styles = {
  width: '50%',
};

export const r16by9: React.FC = () => (
  <div style={styles}>
    <OneImage
      aspectRatio={AspectRatio.r16by9}
      src="/asset/News/6013/20190923_International-Food-Festival_069-1.jpg"
      alt="Alt text"
      mslResource
    />
  </div>
);

export const r1by1: React.FC = () => (
  <div style={styles}>
    <OneImage
      aspectRatio={AspectRatio.r1by1}
      src="/asset/News/6013/20190923_International-Food-Festival_069-1.jpg"
      alt="Alt text"
      mslResource
    />
  </div>
);

export const r20by9: React.FC = () => (
  <div style={styles}>
    <OneImage
      aspectRatio={AspectRatio.r20by9}
      src="/asset/News/6013/20190923_International-Food-Festival_069-1.jpg"
      alt="Alt text"
      mslResource
    />
  </div>
);

export const r3by4: React.FC = () => (
  <div style={styles}>
    <OneImage
      aspectRatio={AspectRatio.r3by4}
      src="/asset/News/6013/20190923_International-Food-Festival_069-1.jpg"
      alt="Alt text"
      mslResource
    />
  </div>
);
