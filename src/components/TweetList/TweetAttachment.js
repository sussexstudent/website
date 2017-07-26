import React from 'react';
import PropTypes from 'prop-types';
import LoadLinkedImage from '../LoadLinkedImage';

const TweetAttachment = ({ tweet }) => {
  if (
    Object.hasOwnProperty.call(tweet.entities, 'media') &&
    tweet.entities.media.length > 0
  ) {
    const media = tweet.entities.media[0];

    return (
      <div className="Tweet__media">
        <LoadLinkedImage
          src={`${media.media_url_https}:small`}
          area="TweetList"
          alt=""
        />
      </div>
    );
  }

  return null;
};

TweetAttachment.propTypes = {
  tweet: PropTypes.shape({
    entities: PropTypes.shape({
      media: PropTypes.arrayOf(
        PropTypes.shape({
          media_url_https: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
};

export default TweetAttachment;
