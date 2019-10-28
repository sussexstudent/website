import { storiesOf } from '@storybook/react';
import { LoadableLoading } from '../../../website/src/components/LoadableLoading/index';

storiesOf('Loadable Loading', module)
  .add('Error', () => (
    <LoadableLoading error={new Error()} timedOut={false} pastDelay={false} />
  ))
  .add('Timed out', () => (
    <LoadableLoading error={null} timedOut={true} pastDelay={false} />
  ))
  .add('Past delay', () => (
    <LoadableLoading error={null} timedOut={false} pastDelay={true} />
  ));
