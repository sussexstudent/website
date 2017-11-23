import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TweetHeader from './TweetHeader';
import TweetPermalink from './TweetPermalink';
import TweetContent from './TweetContent';
import TweetAttachment from './TweetAttachment';

function Tweet({ isQuoted, data }) {
  const isRetweet = Object.hasOwnProperty.call(data, 'retweeted_status');
  const hasQuote = Object.hasOwnProperty.call(data, 'quoted_status');
  const tweet = isRetweet ? data.retweeted_status : data;

  /* eslint-disable */

  return React.createElement(
    isQuoted ? 'div' : 'li',
    {
      className: cx('Tweet', { 'Tweet--quoted': isQuoted }),
    },
    isRetweet ? (
      <div className="Tweet__header">
        <span className="Tweet__retweeted">{data.user.name} Retweeted</span>
      </div>
    ) : null,
    <TweetHeader user={tweet.user} />,
    <div>
      <TweetContent tweet={tweet} />
      <TweetAttachment tweet={tweet} />
      {hasQuote ? (
        <div className="Tweet__quoted">
          <Tweet data={tweet.quoted_status} isQuoted />
        </div>
      ) : null}
      {!isQuoted ? <TweetPermalink tweet={tweet} /> : null}
    </div>,
    <a
      href={`https://twitter.com/${tweet.user.screen_name}/statuses/${
        tweet.id_str
      }`}
      className="Tweet__faux-link"
    />
  );
}
/* eslint-enable */

Tweet.propTypes = {
  data: PropTypes.shape({
    id_str: PropTypes.string.isRequired,
  }).isRequired,
  isQuoted: PropTypes.bool.isRequired,
};

Tweet.defaultProps = {
  isQuoted: false,
};

export default Tweet;
