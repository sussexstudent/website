import { ContentPage } from '../content/ContentPage';
import React from 'react';
import { FreshersContainer } from './FreshersContainer';
import { RouteComponentProps } from 'react-router';

export const FreshersContentAPI: React.FC<RouteComponentProps> = (props) => (
  <FreshersContainer>
    <ContentPage path={props.location.pathname} history={props.history} />
  </FreshersContainer>
);
