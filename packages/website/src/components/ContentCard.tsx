import React from 'react';
import cx from 'classnames';

interface ContentCardProps {
  anchor?: string;
  children?: any;
  bleed?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
  anchor = undefined,
  children,
  bleed = false,
}) => (
  <div className={cx('ContentCard', { 'ContentCard--bleed': bleed })}>
    {anchor !== undefined ? (
      <span className="u-position-anchor" id={anchor} />
    ) : null}
    {children}
  </div>
);

export default ContentCard;
