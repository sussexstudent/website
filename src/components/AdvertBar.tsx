import React from 'react';
import cx from 'classnames';
import MSLTag from './MSLTag';

interface IProps {
  className?: string;
  position: string;
  dark?: boolean;
}

const AdvertBar = ({ className = '', position, dark = false }: IProps) => (
  <div
    className={cx('AdvertBar', 'advert', className, {
      'AdvertBar--dark': dark,
    })}
  >
    <div
      className="AdvertBar__advert"
      dangerouslySetInnerHTML={{
        __html: MSLTag('Advert', { Position: position }),
      }}
    />
  </div>
);

export default AdvertBar;
