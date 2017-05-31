import React from 'react';
import cx from 'classnames';

function BackBar({ color, link, children }) {
  return (
    <div className={cx('BackBar', `BackBar--color-${color}`)}>
      <a href={link}>

        {children}
      </a>
    </div>
  );
}

export default BackBar;
