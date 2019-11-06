import { LoadableLoading } from '../../../website/src/components/LoadableLoading/index';

export default { title: 'Utils|Module Loader' };

export const ErrorState = () => (
  <LoadableLoading
    error={new Error('failure')}
    timedOut={false}
    pastDelay={false}
  />
);

export const TimeOutState = () => (
  <LoadableLoading error={null} timedOut={true} pastDelay={false} />
);

export const PastDelayState = () => (
  <LoadableLoading error={null} timedOut={false} pastDelay={true} />
);
