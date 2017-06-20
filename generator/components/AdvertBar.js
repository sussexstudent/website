import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MSLTag from './MSLTag';

const AdvertBar = ({ position, dark = false }) =>
  <div className={cx('AdvertBar', 'advert', { 'AdvertBar--dark': dark })}>
    <div
      className="AdvertBar__advert"
      dangerouslySetInnerHTML={{
        __html: MSLTag('Advert', { Position: position }),
      }}
    />
  </div>;

AdvertBar.propTypes = {
  position: PropTypes.string.isRequired,
  dark: PropTypes.bool,
};

export default AdvertBar;
