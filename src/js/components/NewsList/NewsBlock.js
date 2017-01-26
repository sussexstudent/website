import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const NewsBlock = ({ item: { title, link, pubDate, led, imageURL = null } }) => (
  <li className="NewsGrid__item NewsBlock">
    {imageURL && <div className="NewsBlock__image" style={{ backgroundImage: `url(${imageURL})` }} />}
    <div className="NewsBlock__content">
      <a className="NewsBlock__title-link" href={link}>
        <h2 className="NewsBlock__title">{title}</h2>
      </a>
      <p className="NewsBlock__standfirst">{led}</p>
      <div className="NewsBlock__meta">
        <date className="NewsBlock__date">{distanceInWordsToNow(pubDate)}</date>
      </div>
    </div>
  </li>
);

NewsBlock.propTypes = {
  item: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    pubDate: React.PropTypes.instanceOf(Date).isRequired,
    led: React.PropTypes.string.isRequired,
    imageURL: React.PropTypes.string,
  }),
};

export default NewsBlock;
