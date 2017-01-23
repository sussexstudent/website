import React from 'react';

const TweetAttachment = ({ tweet }) => {
  if (Object.hasOwnProperty.call(tweet.entities, 'media') && tweet.entities.media.length > 0) {
    const media = tweet.entities.media[0];

    return (
      <div className="Tweet__media">
        <img src={`${media.media_url_https}:small`} role="presentation" />
      </div>
    );
  }

  return null;
};

TweetAttachment.propTypes = {
  tweet: React.PropTypes.shape({
    entities: React.PropTypes.shape({
      media: React.PropTypes.arrayOf(React.PropTypes.shape({
        media_url_https: React.PropTypes.string.isRequired,
      })),
    }),
  }),
};


export default TweetAttachment;
