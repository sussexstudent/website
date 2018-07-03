import React from 'react';

interface FalmerDetailHeaderProps {
  title: string;
  tags?: any;
  actions?: any;
}

export const FalmerDetailHeader: React.SFC<FalmerDetailHeaderProps> = (
  props,
) => (
  <div className="FalmerDetailHeader">
    <h2 className="Heading Heading--medium FalmerDetailHeader__heading">
      {props.title}
    </h2>
    {props.tags && props.tags()}
    <div>{props.actions && props.actions()}</div>
  </div>
);
