import React from 'react';
import Tweet from './Tweet';
import { tweetType } from './props';

function TweetList({ tweets, isLoading }) {
  if (isLoading) {
    return (
      <ul className="TweetList">
        <p>Loading</p>
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
  tweets: React.PropTypes.arrayOf(tweetType),
  isLoading: React.PropTypes.bool,
};

export default TweetList;
