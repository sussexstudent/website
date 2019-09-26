import React from 'react';
import { Loader } from '../Loader/index';

interface IProps {
  error: null | Error;
  timedOut: boolean;
  pastDelay: boolean;
}

function Loading(props: IProps) {
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
}

export { Loading as LoadableLoading };

export default Loading;
