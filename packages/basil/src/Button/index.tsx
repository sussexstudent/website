import React from 'react';
import cx from 'classnames';

interface IProps {
  href: string;
  children: any;
  endOfCard?: boolean;
}

const Button: React.FC<IProps> = ({ href, endOfCard = false, children }) => {
  return (
    <a className={cx('Button', { 'Button--endOfCard': endOfCard })} href={href}>
      {children}
    </a>
  );
};

export default Button;
