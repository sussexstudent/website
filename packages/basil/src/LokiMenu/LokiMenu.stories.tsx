import { storiesOf } from '@storybook/react';
import { LokiMenu } from '../../../website/src/components/LokiMenu/index';
import { Storybase } from '../../../website/src/components/Storybase';

storiesOf('LokiMenu', module)
  .addDecorator(Storybase())
  .add('standard', () => <LokiMenu />);
