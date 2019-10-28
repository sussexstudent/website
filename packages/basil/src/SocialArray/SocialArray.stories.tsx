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
      }}
    />
  ));
