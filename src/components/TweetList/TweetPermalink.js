import React from 'react';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';

const TweetPermalink = ({ tweet }) => (
  <a
    href={`https://twitter.com/statuses/${tweet.id_str}`}
    className="Tweet__permalink"
  >
    {formatDistance(tweet.created_at, new Date())} ago
  </a>
);

TweetPermalink.propTypes = {
  tweet: PropTypes.shape({
    id_str: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default TweetPermalink;
