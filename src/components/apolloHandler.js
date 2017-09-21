import { compose, hoistStatics } from 'recompose';
import React from 'react';

import LoaderComponent from '~components/Loader';

function ErrorHandler() {
  return (
    <div>
      <h1>failed to load</h1>
    </div>
  );
}

export default (
  Loader = LoaderComponent,
  Error = ErrorHandler
) => WrappedComponent =>
  compose(hoistStatics)(props => {
    const propertyName = 'data';
    if (props[propertyName].loading) {
      return <Loader dark />;
    } else if (props[propertyName].error) {
      console.log(props[propertyName].error);
      return <Error {...props} />;
    }

    return <WrappedComponent {...props} />;
  });
