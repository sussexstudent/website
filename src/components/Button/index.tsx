import React from 'react';
import cx from 'classnames';

interface IProps {
  href: string;
  children: any;
  endOfCard?: boolean;
}

function Button({ href, endOfCard = false, children }: IProps) {
  return (
    <a className={cx('Button', { 'Button--endOfCard': endOfCard })} href={href}>
      {children}
    </a>
  );
}

export default Button;
