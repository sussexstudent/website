import React from 'react';
import { sortBy, unescape } from 'lodash';
import {
  Entities,
  HashtagEntity,
  TweetData,
  URLEntity,
  UserEntity,
} from '~components/TweetList/types';

const addTypeKey = (type: string, entityList: Entities[]) => {
  return entityList.map((e) => {
    e._type = type;
    return e;
  });
};

function getEntities(tweet: TweetData) {
  return [
    ...addTypeKey('hashtags', tweet.entities['hashtags'] || []),
    ...addTypeKey('urls', tweet.entities['urls'] || []),
    ...addTypeKey('media', tweet.entities['media'] || []),
    ...addTypeKey('user_mentions', tweet.entities['user_mentions'] || []),
  ];
}

function renderTweetContent(tweet: TweetData) {
  const fullText = [...tweet.full_text];
  const displayText = fullText.slice(0, tweet.display_text_range[1]);

  const entities = sortBy(
    getEntities(tweet),
    [(e: Entities) => e.indices[0]], // todo
  );

  const parts: any[] = [];
  let position = 0;
  let key = 0;

  entities.forEach((entity) => {
    // our entity starts after the end of our tweet, skip
    if (entity.indices[0] > tweet.display_text_range[1]) {
      return;
    }

    parts.push(
      unescape(displayText.slice(position, entity.indices[0]).join('')),
    );

    const replaced = fullText.slice(...entity.indices);

    if (entity._type === 'hashtags') {
      parts.push(
        <a
          href={`https://twitter.com/hashtag/${(entity as HashtagEntity).text}`}
          key={(key += 1)}
        >
          {replaced.join('')}
        </a>,
      );
    } else if (entity._type === 'user_mentions') {
      parts.push(
        <a
          href={`https://twitter.com/${(entity as UserEntity).screen_name}`}
          key={(key += 1)}
        >
          {replaced.join('')}
        </a>,
      );
    } else if (entity._type === 'urls') {
      parts.push(
        <a href={(entity as URLEntity).url} key={(key += 1)}>
          {(entity as URLEntity).display_url}
        </a>,
      );
    }

    position = entity.indices[1];
  });

  parts.push(
    unescape(displayText.slice(position, tweet.display_text_range[1]).join('')),
  );

  return parts;
}

interface IProps {
  tweet: TweetData;
}

const TweetContent = ({ tweet }: IProps) => (
  <div className="Tweet__content">{renderTweetContent(tweet)}</div>
);

export default TweetContent;
