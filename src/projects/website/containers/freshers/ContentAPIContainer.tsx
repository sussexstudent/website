import { ContentPage } from '~website/containers/content/ContentPage';
import React from 'react';
import { FreshersContainer } from '~website/containers/freshers/FreshersContainer';

export const FreshersContentAPI = (props: any) => (
  <FreshersContainer>
    <ContentPage path={props.location.pathname} navigate={props.navigate} />
  </FreshersContainer>
);
