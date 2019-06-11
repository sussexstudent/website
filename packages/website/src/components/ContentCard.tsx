import React from 'react';
import cx from 'classnames';

interface IProps {
  anchor?: string;
  children?: any;
  bleed?: boolean;
}

const ContentCard = ({
  anchor = undefined,
  children,
  bleed = false,
}: IProps) => (
  <div className={cx('ContentCard', { 'ContentCard--bleed': bleed })}>
    {anchor !== undefined ? (
      <span className="u-position-anchor" id={anchor} />
    ) : null}
    {children}
  </div>
);

export default ContentCard;
