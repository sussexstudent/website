import React from 'react';
import Loader from '../Loader/index';

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>;
  } else if (props.pastDelay) {
    return <Loader />;
  }
  return null;
}

export default Loading;
