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
      {tweets.slice(0, 4).map(tweet => <Tweet data={tweet} key={tweet.id_str} />)}
      <a className="TweetList__view-more" href="https://twitter.com/USSU/lists/ussu">View on Twitter</a>
    </ul>
  );
}

TweetList.propTypes = {
  tweets: React.PropTypes.arrayOf(React.PropTypes.shape({
    id_str: React.PropTypes,
  })),
  isLoading: React.PropTypes.bool.isRequired,
};

TweetList.defaultProps = {
  tweets: false,
};

export default TweetList;
