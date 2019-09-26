import React from 'react';

function imageLoaded(area) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => window.emitter.emit('imageLoaded', { area }));
  });
}

export const LoadLinkedImage = ({ area = 'na', ...props }) => {
  // eslint-disable-next-line
  return <img onLoad={imageLoaded.bind(this, area)} {...props} />;
}
