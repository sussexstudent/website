import React from 'react';
import { storiesOf } from '@storybook/react';
import { Storybase } from '../Storybase';
import { SocialArray } from '../SocialArray/index';

storiesOf('SocialArray', module)
  .addDecorator(Storybase())
  .add('default', () => (
    <SocialArray
      networks={{
        twitter: {
          name: '@example',
          link: 'http://twitter.com/example',
        },
      }}
    />
  ));
