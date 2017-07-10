import React from 'react';
import cx from 'classnames';

function Button({ href, children }) {
  return (
    <a className={cx('Button')} href={href}>
      {children}
    </a>
  );
}

export default Button;
