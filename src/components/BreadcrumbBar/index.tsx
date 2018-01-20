import React from 'react';
import cx from 'classnames';

import ChevronForwardIcon from '../../icons/chevron-forward.svg';

interface IProps {
  color?: 'red' | 'blue' | 'green' | 'slate';
  children: any;
}

function BreadcrumbBar({ color = 'blue', children }: IProps) {
  return (
    <ul className={cx('BackBar', 'BackBar--breadcrumb', `BackBar--color-${color}`)}>
      {(Array.isArray(children) ? children : [children]).map((child: any, index: number) => (
        <li>
          {child}
          {index < children.length - 1 && <span className="BackBar__chevron"><ChevronForwardIcon /></span>}
        </li>
      ))}
    </ul>
  );
}

export { BreadcrumbBar };
