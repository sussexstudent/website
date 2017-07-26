import React from 'react';
import { storiesOf } from '@storybook/react';
import FigureCollection from './index';

storiesOf('FigureCollection', module).add('default', () =>
  <div className="Container">
    <FigureCollection
      items={[
        {
          imageResource: 'images/4759cccd3b3f4ed4813a260cc0d4833f.original.jpg',
          title: 'Lucy Williams',
          sub: 'Activities Officer',
          link: '/about-us/full-time-elected-officers/activities',
        },
        {
          imageResource: 'images/8da8156f2e0e40b4878dcbea569ce2b5.original.jpg',
          title: 'Aisling Murray',
          sub: 'Society and Citizenship Officer',
          link: '/about-us/full-time-elected-officers/society-citizenship',
        },
        {
          imageResource: 'images/241b436e49524d8da68faf1f1f83c4b6.original.jpg',
          title: 'Lulah Stratheran Brady',
          sub: 'Undergraduate Education Officer',
          link: '/about-us/full-time-elected-officers/undergraduate-education',
        },
        {
          imageResource: 'images/f07caf2bb1114cb8a18dd49a6e9e1045.original.jpg',
          title: 'Sarah McIntosh',
          sub: 'Postgraduate Education Officer',
          link: '/about-us/full-time-elected-officers/postgraduate-education',
        },
        {
          imageResource: 'images/16664de397694b5ea5e194b0a1fa73dc.original.jpg',
          title: 'Frida Gustafsson',
          sub: 'President',
          link: '/about-us/full-time-elected-officers/president',
        },
        {
          imageResource: 'images/d05f369bcabc47ed83ecaac0e36a9adb.original.jpg',
          title: 'Grainne Gahan',
          sub: 'Welfare Officer',
          link: '/about-us/full-time-elected-officers/welfare',
        },
      ]}
    />
  </div>
);
