import React from 'react';
import cx from 'classnames';
import MSLTag from './MSLTag';

const AdvertBar = ({ position, dark = false }) => (
  <div className={cx('AdvertBar', 'advert', { 'AdvertBar--dark': dark })}>
    <div className="AdvertBar__advert" dangerouslySetInnerHTML={{ __html: MSLTag('Advert', { Position: position }) }} />
  </div>
);

AdvertBar.propTypes = {
  position: React.PropTypes.string.isRequired,
  dark: React.PropTypes.bool,
};

export default AdvertBar;
