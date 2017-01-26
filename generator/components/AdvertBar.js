import React from 'react';
import cx from 'classnames';

const AdvertBar = ({ dark = false }) => (
  <div className={cx('AdvertBar', { 'AdvertBar--dark': dark })}>
    <img className="AdvertBar__advert" alt="ad" src="https://sussexstudent.com/asset/Advert/1/studenttaxisbannerad.jpg" />
  </div>
);

AdvertBar.propTypes = {
  dark: React.PropTypes.bool,
};

export default AdvertBar;
