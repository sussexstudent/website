import React from 'react';
import Tweet from './Tweet';
import Loader from '../Loader';

function TweetList({ tweets, isLoading }) {
  if (isLoading) {
    return (
      <ul className="TweetList">
        <Loader />
      </ul>
    );
  }

  if (!isLoading && !tweets) {
    return (
      <ul className="TweetList">
        <p>{'Something went wong, we\'re unable to load the latest tweets'}</p>
      </ul>
    );
  }

  return (
    <ul className="TweetList">
      {tweets.map(tweet => <Tweet data={tweet} key={tweet.id_str} />)}
    </ul>
  );
}

TweetList.propTypes = {
  tweets: React.PropTypes.arrayOf(React.PropTypes.shape({
    id_str: React.PropTypes,
  })),
  isLoading: React.PropTypes.bool,
};

export default TweetList;
