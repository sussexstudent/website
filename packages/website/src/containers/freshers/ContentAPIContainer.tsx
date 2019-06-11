import { ContentPage } from '../content/ContentPage';
import React from 'react';
import { FreshersContainer } from '../freshers/FreshersContainer';

export const FreshersContentAPI = (props: any) => (
  <FreshersContainer>
    <ContentPage path={props.location.pathname} history={props.history} />
  </FreshersContainer>
);
