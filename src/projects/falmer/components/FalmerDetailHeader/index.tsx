import React from 'react';
import styled from '@emotion/styled';
import { type, TypeSize } from '~libs/style/type';

interface FalmerDetailHeaderProps {
  title: string;
  tags?: any;
  actions?: any;
}

const Heading = styled.div({
  float: 'left',
  paddingRight: '1em',
  ...type(TypeSize.Pica),
});

export const FalmerDetailHeader: React.FC<FalmerDetailHeaderProps> = (
  props,
) => (
  <div>
    <Heading>{props.title}</Heading>
    {props.tags && props.tags()}
    <div>{props.actions && props.actions()}</div>
  </div>
);
