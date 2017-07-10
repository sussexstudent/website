import React from 'react';
import PropTypes from 'prop-types';

const TweetHeader = ({ user }) =>
  <div className="Tweet__header">
    <span className="Tweet__name">
      {user.name}
    </span>
    <span className="Tweet__screen-name">
      @{user.screen_name}
    </span>
  </div>;

TweetHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TweetHeader;
