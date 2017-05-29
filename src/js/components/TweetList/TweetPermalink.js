import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const TweetPermalink = ({ tweet }) => (
  <a
    href={`https://twitter.com/statuses/${tweet.id_str}`}
    className="Tweet__permalink"
  >
    {distanceInWordsToNow(tweet.created_at)} ago
  </a>
);

TweetPermalink.propTypes = {
  tweet: React.PropTypes.shape({
    id_str: React.PropTypes.string.isRequired,
    created_at: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default TweetPermalink;
