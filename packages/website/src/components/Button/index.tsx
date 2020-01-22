import React from 'react';
import cx from 'classnames';

interface ButtonProps {
  href: string;
  endOfCard?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  endOfCard = false,
  children,
}) => {
  return (
    <a className={cx('Button', { 'Button--endOfCard': endOfCard })} href={href}>
      {children}
    </a>
  );
};
