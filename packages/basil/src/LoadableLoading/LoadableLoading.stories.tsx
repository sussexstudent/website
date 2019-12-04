import React from 'react';
import { LoadableLoading } from '../../../website/src/components/LoadableLoading/index';

export default { title: 'Utils|Module Loader' };

export const ErrorState: React.FC = () => (
  <LoadableLoading
    error={new Error('failure')}
    timedOut={false}
    pastDelay={false}
  />
);

export const TimeOutState: React.FC = () => (
  <LoadableLoading error={null} timedOut={true} pastDelay={false} />
);

export const PastDelayState: React.FC = () => (
  <LoadableLoading error={null} timedOut={false} pastDelay={true} />
);
