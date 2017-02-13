import React from 'react';
import cx from 'classnames';
import MSLTag from './MSLTag';

const Main = ({ legacy }) => (
  <main className={cx('Site__content')}>
    { legacy ? (
      <div className={cx('Container')}>
        <div className={cx('Legacy')} dangerouslySetInnerHTML={{ __html: MSLTag('Content') }} />
      </div>
      ) : (
        <div className={cx('Container')} dangerouslySetInnerHTML={{ __html: MSLTag('Content') }} />
      )
    }
  </main>
);

Main.propTypes = {
  legacy: React.PropTypes.bool.isRequired,
};

Main.defaultProps = {
  legacy: false,
};

export default Main;
