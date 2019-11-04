import { storiesOf } from '@storybook/react';
import { Storybase } from '../../../website/src/components/Storybase';
import { SocialMenu } from '../../../website/src/components/SocialMenu/index';

storiesOf('SocialMenu', module)
  .addDecorator(Storybase())
  .add('default', () => <SocialMenu />)
  .add('mobile', () => <SocialMenu mobile />)
  .add('List', () => <SocialMenu asList mobile />);
