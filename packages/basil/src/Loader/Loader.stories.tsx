import { storiesOf } from '@storybook/react';
import { Loader } from '../../../website/src/components/Loader/index';

storiesOf('Loader', module)
  .add('light', () => <Loader />)
  .add('dark', () => <Loader dark />);
