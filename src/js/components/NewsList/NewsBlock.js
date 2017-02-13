import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import isToday from 'date-fns/is_today';

const NewsBlock = ({ item: { title, link, pubDate, led, imageURL = null } }) => (
  <li className="NewsGrid__item NewsBlock">
    <a className="NewsBlock__link" href={link}>
      {imageURL && <div className="NewsBlock__image" style={{ backgroundImage: `url(${imageURL})` }} />}
      <div className="NewsBlock__content">
        <div className="NewsBlock__title-link">
          <h2 className="NewsBlock__title">{title}</h2>
        </div>
        <p className="NewsBlock__standfirst">{led}</p>
        <div className="NewsBlock__meta">
          <date className="NewsBlock__date">{isToday(pubDate) ? 'Today' : `${distanceInWordsToNow(pubDate)} ago`}</date>
        </div>
      </div>
    </a>
  </li>
);

NewsBlock.propTypes = {
  item: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    pubDate: React.PropTypes.instanceOf(Date).isRequired,
    led: React.PropTypes.string.isRequired,
    imageURL: React.PropTypes.string,
  }).isRequired,
};

export default NewsBlock;
