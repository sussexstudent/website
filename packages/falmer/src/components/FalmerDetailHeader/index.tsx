import React from 'react';
import { type, TypeSize } from '@ussu/common/src/libs/style/type';

interface FalmerDetailHeaderProps {
  title: string;
  tags?: any;
  actions?: any;
}

export const FalmerDetailHeader: React.FC<FalmerDetailHeaderProps> = (
  props,
) => (
  <div>
    <div
      css={{
        float: 'left',
        paddingRight: '1em',
        ...type(TypeSize.Pica),
      }}
    >
      {props.title}
    </div>
    {props.tags && props.tags()}
    <div>{props.actions && props.actions()}</div>
  </div>
);
