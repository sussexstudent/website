import React from 'react';
import LoadLinkedImage from '../LoadLinkedImage';
import { TweetData } from '~components/TweetList/types';

interface IProps {
  tweet: TweetData;
}

const TweetAttachment = ({ tweet }: IProps) => {
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

export default TweetAttachment;
