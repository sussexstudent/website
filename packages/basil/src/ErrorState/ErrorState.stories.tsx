import { storiesOf } from '@storybook/react';
import { ErrorState } from '../../../website/src/components/ErrorState/index';

storiesOf('ErrorState', module).add('default', () => (
  <div>
    <ErrorState />
  </div>
));
