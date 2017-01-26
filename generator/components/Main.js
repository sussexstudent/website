import React from 'react';
import cx from 'classnames';
import MSLTag from './MSLTag';

const Main = ({ legacy }) => (
  <main className={cx('Site__content', { Legacy: legacy })} dangerouslySetInnerHTML={{ __html: MSLTag({ name: 'Content' }) }} />
);

Main.propTypes = {
  legacy: React.PropTypes.bool.isRequired,
};

Main.defaultProps = {
  legacy: false,
};

export default Main;
