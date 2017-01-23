import React from 'react';
import cx from 'classnames';
import TweetHeader from './TweetHeader';
import TweetPermalink from './TweetPermalink';
import TweetContent from './TweetContent';
import TweetAttachment from './TweetAttachment';

function Tweet({ isQuoted, data }) {
  const isRetweet = Object.hasOwnProperty.call(data, 'retweeted_status');
  const hasQuote = Object.hasOwnProperty.call(data, 'quoted_status');
  const tweet = isRetweet ? data.retweeted_status : data;

  return (
    <li className={cx('Tweet', { 'Tweet--quoted': isQuoted })}>
      { isRetweet ? (
        <div className="Tweet__header">
          <span className="Tweet__retweeted">{data.user.name} Retweeted</span>
        </div>
      ) : null }
      <TweetHeader user={tweet.user} />
      <div>
        <TweetContent tweet={tweet} />
        <TweetAttachment tweet={tweet} />
        {hasQuote ? <div className="Tweet__quoted">
          <Tweet data={tweet.quoted_status} isQuoted />
        </div> : null}
        {!isQuoted ? <TweetPermalink tweet={tweet} /> : null}
      </div>
    </li>
  );
}

Tweet.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    id_str: React.PropTypes,
  })),
  isQuoted: React.PropTypes.boolean,
};

Tweet.defaultProps = {
  isQuoted: false,
};

export default Tweet;
