import { compose, hoistStatics } from 'recompose';
import React from 'react';
import { QueryProps, MutationFunc } from 'react-apollo'

import LoaderComponent from '~components/Loader';
import {ErrorState} from "~components/ErrorState";

const apolloHandler = (
  Loader = LoaderComponent,
  Error = ErrorState
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


export declare type ApolloHandlerChildProps<P, R> = P & {
  data: QueryProps & R;
  mutate?: MutationFunc<R>;
};
