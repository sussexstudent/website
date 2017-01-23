import React from 'react';
import split from 'lodash/split';
import sortBy from 'lodash/sortBy';
import unescape from 'lodash/unescape';

function getEntities(types, tweet) {
  let entities = [];
  types.forEach((type) => {
    entities = entities.concat((tweet.entities[type] || []).map((entity) => {
      const e = entity;
      e._type = type;
      return e;
    }));
  });

  return entities;
}

function renderTweetContent(tweet) {
  const fullText = split(tweet.full_text, '');
  const displayText = fullText.slice(0, tweet.display_text_range[1]);

  const entities = sortBy(getEntities(['hashtags', 'urls', 'media', 'user_mentions'], tweet), e => e.indices[0]);

  const parts = [];
  let position = 0;
  let key = 0;

  const typeHandlers = {
    hashtags(entity, replaced) {
      parts.push(<a href={`https://twitter.com/hashtag/${entity.text}`} key={key += 1}>{replaced.join('')}</a>);
    },
    user_mentions(entity, replaced) {
      parts.push(<a href={`https://twitter.com/${entity.screen_name}`} key={key += 1}>{replaced.join('')}</a>);
    },
    urls(entity) {
      parts.push(<a href={entity.url} key={key += 1}>{entity.display_url}</a>);
    },
  };

  entities.forEach((entity) => {
    // our entity starts after the end of our tweet, skip
    if (entity.indices[0] > tweet.display_text_range[1]) {
      return;
    }

    parts.push(unescape(displayText.slice(position, entity.indices[0]).join('')));

    const handler = typeHandlers[entity._type];

    if (handler) {
      handler(entity, fullText.slice(...entity.indices));
    }

    position = entity.indices[1];
  });

  parts.push(unescape(displayText.slice(position, tweet.display_text_range[1]).join('')));

  return parts;
}

const TweetContent = ({ tweet }) => (
  <div className="Tweet__content">{renderTweetContent(tweet)}</div>
);

TweetContent.propTypes = {
  tweet: React.PropTypes.shape({
    full_text: React.PropTypes.string.isRequired,
  }),
};

export default TweetContent;
