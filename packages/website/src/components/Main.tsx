import React from 'react';
import cx from 'classnames';
import { MSLTag } from './MSLTag';

interface MainProps {
  legacy?: boolean;
}

export const Main: React.FC<MainProps> = ({ legacy = false }) => (
  <main className={cx('Site__content u-keep-footer-down')}>
    {legacy ? (
      <div className={cx('Container')}>
        <div
          className={cx('Legacy')}
          dangerouslySetInnerHTML={{ __html: MSLTag('Content') }}
        />
      </div>
    ) : (
      <div
        className={cx('LokiContainer', 'js-page-container')}
        dangerouslySetInnerHTML={{ __html: MSLTag('Content') }}
      />
    )}
  </main>
);
