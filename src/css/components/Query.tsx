import React from 'react';
import { Granule, createStore } from '@brudil/granule';
import getFalmerEndpoint from "~libs/getFalmerEndpoint";

const store = createStore();

export const Query = (props: any) => (
  <Granule
    endpoint={getFalmerEndpoint()}
    store={store}
    {...props}
  >
    {props.children}
  </Granule>
);
