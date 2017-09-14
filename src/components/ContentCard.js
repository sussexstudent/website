import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const ContentCard = ({ anchor = null, children, bleed = false }) => (
  <div className={cx('ContentCard', { 'ContentCard--bleed': bleed })}>
    {anchor !== null ? (
      <span className="u-position-anchor" id={anchor} />
    ) : null}
    {children}
  </div>
);

ContentCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentCard;
