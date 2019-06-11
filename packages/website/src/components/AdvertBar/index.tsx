import React from 'react';
import cx from 'classnames';

interface IProps {
  className?: string;
  dark?: boolean;
  children: any;
}

const AdvertBar = ({ children, className = '', dark = false }: IProps) => (
  <div
    className={cx('AdvertBar', 'advert', className, {
      'AdvertBar--dark': dark,
    })}
  >
    {children}
  </div>
);

export default AdvertBar;
