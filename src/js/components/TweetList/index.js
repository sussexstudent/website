import React from 'react';
import Tweet from './Tweet';
import { tweetType } from './props';

function TweetList(props) {
  return (
    <ul className="TweetList">
      {props.tweets.map(tweet => <Tweet data={tweet} key={tweet.id} />)}
    </ul>
  );
}

TweetList.propTypes = {
  tweets: React.PropTypes.arrayOf(tweetType),
};

export default TweetList;
