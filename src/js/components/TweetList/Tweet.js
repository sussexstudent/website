import React from 'react';
import _ from 'lodash';
import { tweetType } from './props';

function getEntities(types, tweet) {
  let entities = [];
  types.forEach((type) => {
    console.log(tweet.entities[type], type);
    entities = entities.concat((tweet.entities[type] || []).map((entity) => {
      const e = entity;
      e._type = type;
      return e;
    }));
  });

  return entities;
}

function getTweetAttachment(tweet) {
  if (Object.hasOwnProperty.call(tweet.entities, 'media') && tweet.entities.media.length > 0) {
    const media = tweet.entities.media[0];

    return (
      <div className="Tweet__media">
        <img src={media.media_url_https} role="presentation" />
      </div>
    );
  }

  return null;
}

function renderTweetContent(tweet) {
  const fullText = _.split(tweet.full_text, '');
  const displayText = fullText.slice(...tweet.display_text_range);

  const entities = _.sortBy(getEntities(['hashtags', 'urls', 'media', 'user_mentions'], tweet), e => e.indices[0]);

  const parts = [];
  let position = 0;

  const typeHandlers = {
    hashtags(entity, replaced) {
      console.log({ replaced });
      parts.push(<a href={`https://twitter.com/hashtag/${entity.text}`}>{replaced}</a>);
    },
    user_mentions(entity, replaced) {
      parts.push(<a href={`https://twitter.com/${entity.screen_name}`}>{replaced}</a>);
    },
    urls(entity) {
      parts.push(<a href={entity.url}>{entity.display_url}</a>);
    },
  };

  entities.forEach((entity) => {
    if (entity.indices[0] > tweet.display_text_range[1]) {
      return;
    }

    parts.push(displayText.slice(position, entity.indices[0]).join(''));

    const handler = typeHandlers[entity._type];

    if (handler) {
      handler(entity, fullText.slice(...entity.indices));
    }

    position = entity.indices[1];
  });

  parts.push(displayText.slice(position, tweet.display_text_range[1]).join(''));

  return parts;
}

function Tweet({ data }) {
  console.log(data);
  if (Object.hasOwnProperty.call(data, 'retweeted_status')) {
    return (
      <li className="Tweet">
        <div>
          <span className="Tweet__retweeted">{data.user.name} Retweeted</span>
        </div>
        <div className="Tweet__header">
          <span className="Tweet__name">{data.retweeted_status.user.name}</span>
          <span className="Tweet__screen-name">@{data.retweeted_status.user.screen_name}</span>
        </div>
        <div>
          <div className="Tweet__content">{renderTweetContent(data.retweeted_status)}</div>
          {getTweetAttachment(data.retweeted_status)}
          <a href={`https://twitter.com/statuses/${data.id_str}`} className="Tweet__permalink">14 minutes ago</a>
        </div>
      </li>
    );
  }

  return (
    <li className="Tweet">
      <div className="Tweet__header">
        <span className="Tweet__name">{data.user.name}</span>
        <span className="Tweet__screen-name">@{data.user.screen_name}</span>
      </div>
      <div>
        <div className="Tweet__content">{renderTweetContent(data)}</div>
        {getTweetAttachment(data)}
        <a href={`https://twitter.com/statuses/${data.id_str}`} className="Tweet__permalink">14 minutes ago</a>
      </div>
    </li>
  );
}

Tweet.propTypes = {
  data: tweetType,
};

export default Tweet;
