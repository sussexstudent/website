import React from 'react';

interface IProps {
  anchor?: string;
  children: any;
}

const ContentCard = ({ anchor, children }: IProps) => (
  <div className="ContentCard">
    {anchor !== undefined ? (
      <span className="u-position-anchor" id={anchor} />
    ) : null}
    {children}
  </div>
);

export default ContentCard;
