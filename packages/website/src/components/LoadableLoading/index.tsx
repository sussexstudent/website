import React from 'react';
import { Loader } from '../Loader/index';

interface LoadingProps {
  error: null | Error;
  timedOut: boolean;
  pastDelay: boolean;
}

const Loading: React.FC<LoadingProps> = (props) => {
  if (props.error) {
    return <div>Error!</div>;
  }

  if (props.timedOut) {
    return <div>Taking a long time...</div>;
  }

  if (props.pastDelay) {
    return <Loader />;
  }

  return null;
};

export { Loading as LoadableLoading };

export default Loading;
