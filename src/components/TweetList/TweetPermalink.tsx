import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { TweetData } from '~components/TweetList/types';

interface IProps {
  tweet: TweetData;
}

const TweetPermalink = ({ tweet }: IProps) => (
  <a
    href={`https://twitter.com/statuses/${tweet.id_str}`}
    className="Tweet__permalink"
  >
    {formatDistance(new Date(tweet.created_at), new Date())} ago
  </a>
);

export default TweetPermalink;
