import React from 'react';
import MSLTag from './MSLTag';
import cx from 'classnames';

const AdvertBar = ({ position, dark = false }) => (
  <div className={cx('AdvertBar', { 'AdvertBar--dark': dark })}>
    <div className="AdvertBar__advert" dangerouslySetInnerHTML={{ __html: MSLTag('Advert', { Position: position }) }} />
  </div>
);

AdvertBar.propTypes = {
  position: React.PropTypes.string.isRequired,
  dark: React.PropTypes.bool,
};

export default AdvertBar;
