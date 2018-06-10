import React from 'react';
import cx from 'classnames';
import MSLTag from './MSLTag';

interface IProps {
  legacy: boolean;
}

const Main: React.SFC<IProps> = ({ legacy }) => (
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

Main.defaultProps = {
  legacy: false,
};

export default Main;
