import { compose, hoistStatics } from 'recompose';
import React from 'react';

import LoaderComponent from '~components/Loader';

function ErrorHandler() {
  return (
    <div>
      <h1>Failed to load</h1>
    </div>
  );
}

const apolloHandler = (
  Loader = LoaderComponent,
  Error = ErrorHandler
) => (WrappedComponent: any) =>
  compose(hoistStatics)((props: any) => {
    const propertyName = 'data';
    if (props[propertyName].loading) {
      return <Loader dark />;
    } else if (props[propertyName].error) {
      console.log(props[propertyName].error);
      return <Error {...props} />;
    }

    return <WrappedComponent {...props} />;
  });


export default apolloHandler;
export { apolloHandler }
