import React from 'react';
import cx from 'classnames';

interface AdvertBarProps {
  className?: string;
  dark?: boolean;
  children: any;
}

export const AdvertBar: React.FC<AdvertBarProps> = ({
  children,
  className = '',
  dark = false,
}) => (
  <div
    className={cx('AdvertBar', 'advert', className, {
      'AdvertBar--dark': dark,
    })}
  >
    {children}
  </div>
);
