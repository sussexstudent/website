import React from 'react';
import cx from 'classnames';
import TweetHeader from './TweetHeader';
import TweetPermalink from './TweetPermalink';
import TweetContent from './TweetContent';
import TweetAttachment from './TweetAttachment';
import { TweetData } from '~components/TweetList/types';

interface IProps {
  isQuoted?: boolean;
  data: TweetData;
}

const Tweet: React.FC<IProps> = ({ isQuoted = false, data }) => {
  const isRetweet = Object.hasOwnProperty.call(data, 'retweeted_status');
  const tweet: TweetData =
    data.retweeted_status !== undefined ? data.retweeted_status : data;

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
    <TweetHeader name={tweet.user.name} screenName={tweet.user.screen_name} />,
    <div>
      <TweetContent tweet={tweet} />
      <TweetAttachment tweet={tweet} />
      {tweet.quoted_status ? (
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
    />,
  );
};

Tweet.defaultProps = {
  isQuoted: false,
};

export default Tweet;
