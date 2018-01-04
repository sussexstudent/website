import React from 'react';
import cx from 'classnames';

interface IProps {
  href: string;
  children: any;
}

function Button({ href, children }: IProps) {
  return (
    <a className={cx('Button')} href={href}>
      {children}
    </a>
  );
}

export default Button;
