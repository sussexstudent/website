import React from 'react';
import cx from 'classnames';
import { InternalAppLink } from '../InternalAppLink';

interface IProps {
  color?: 'red' | 'blue' | 'green' | 'slate';
  to: string;
  children: any;
}

function BackBar({ color = 'blue', to, children }: IProps) {
  return (
    <div className={cx('BackBar', `BackBar--color-${color}`)}>
      <InternalAppLink to={to}>
        <svg
          className="BackBar__arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <g fill="none" fillRule="evenodd">
            <rect
              className="BackBar__arrow-back"
              width="18"
              height="18"
              rx="2"
            />
            <path
              className="BackBar__arrow"
              fill="#FFF"
              fillRule="nonzero"
              d="M15.715215,9.67002437 C16.0969496,9.29253227 16.0939089,8.67853807 15.7121731,8.30258285 L9.55867891,2.24158095 C8.82411406,1.50934734 7.72454442,2.60694484 8.45759085,3.33917457 L13.0809849,7.94634327 C13.2330683,8.09946147 13.1828826,8.22377469 12.9684427,8.22377469 L2.77867689,8.22377469 C2.34826324,8.22377469 2,8.57094432 2,8.99998035 C2,9.42901639 2.34827492,9.77618601 2.77867689,9.77618601 L12.9684427,9.77618601 C13.1844049,9.77618601 13.2361129,9.89746815 13.0809849,10.0521038 L8.45759085,14.660825 C7.72454442,15.3930586 8.82411795,16.4906522 9.55867891,15.7584186 L15.715215,9.67002437 Z"
              transform="matrix(-1 0 0 1 18 0)"
            />
          </g>
        </svg>
        {children}
      </InternalAppLink>
    </div>
  );
}

export default BackBar;
