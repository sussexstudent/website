import React from 'react';

const TweetHeader = ({ user }) => (
  <div className="Tweet__header">
    <span className="Tweet__name">{user.name}</span>
    <span className="Tweet__screen-name">@{user.screen_name}</span>
  </div>
);

TweetHeader.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    screen_name: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default TweetHeader;
