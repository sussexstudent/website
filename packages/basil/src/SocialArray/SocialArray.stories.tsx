import { storiesOf } from '@storybook/react';
import { Storybase } from '../../../website/src/components/Storybase';
import { SocialArray } from '../../../website/src/components/SocialArray/index';

storiesOf('SocialArray', module)
  .addDecorator(Storybase())
  .add('default', () => (
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
  ));
