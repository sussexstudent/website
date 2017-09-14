import React from 'react';
import PropTypes from 'prop-types';

const ContentCard = ({ anchor = null, children }) => (
  <div className="ContentCard">
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
