import React from 'react';
import TweetHeader from './TweetHeader';
import TweetPermalink from './TweetPermalink';
import TweetContent from './TweetContent';
import TweetAttachment from './TweetAttachment';

function Tweet({ quoted, data }) {
  const isRetweet = Object.hasOwnProperty.call(data, 'retweeted_status');
  const tweet = isRetweet ? data.retweeted_status : data;

  return (
    <li className="Tweet">
      { isRetweet ? (
        <div className="Tweet__header">
          <span className="Tweet__retweeted">{data.user.name} Retweeted</span>
        </div>
      ) : null }
      <TweetHeader user={tweet.user} />
      <div>
        <TweetContent tweet={tweet} />
        <TweetAttachment tweet={tweet} />
        {tweet.quoted_status ? <div className="Tweet__quoted">
          <Tweet data={tweet.quoted_status} quoted />
        </div> : null}
        {!quoted ? <TweetPermalink tweet={tweet} /> : null}
      </div>
    </li>
  );
}

Tweet.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    id_str: React.PropTypes,
  })),
  quoted: React.PropTypes.boolean,
};

Tweet.defaultProps = {
  quoted: false,
};

export default Tweet;
