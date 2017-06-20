import React from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const TweetPermalink = ({ tweet }) =>
  <a
    href={`https://twitter.com/statuses/${tweet.id_str}`}
    className="Tweet__permalink"
  >
    {distanceInWordsToNow(tweet.created_at)} ago
  </a>;

TweetPermalink.propTypes = {
  tweet: PropTypes.shape({
    id_str: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default TweetPermalink;
