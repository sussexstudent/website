import React from 'react';
import SadFaceIcon from '@ussu/common/src/icons/sad-face.svg';

const refreshPage = () =>
  typeof window !== 'undefined' && window.location.reload();

const ErrorState: React.FC<{}> = () => (
  <div className="Stonewall">
    <SadFaceIcon className="Stonewall__image" />
    <h1 className="type-canon">Something went wrong.</h1>
    <p className="type-pica">Something went wrong while making this page.</p>
    <p className="type-pica">We've been notified of what happened.</p>
    <button className="Button type-great-primer" onClick={refreshPage}>
      Refresh this page
    </button>
  </div>
);

export { ErrorState };
