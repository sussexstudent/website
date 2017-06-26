import React from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import isToday from 'date-fns/is_today';
import Logotype from '../../../img/logotype';

const NewsBlock = ({
  item: { title, link, publishedDate, led, imageURL = null },
}) =>
  <li className="NewsGrid__item NewsBlock">
    <a className="NewsBlock__link" href={link}>

      <div className="NewsBlock__image">
        <div className="u-responsive-ratio u-responsive-ratio--43">
          {imageURL
            ? <img src={imageURL} alt="" />
            : <div className="NewsBlock__image--default">
                <Logotype />
              </div>}
        </div>
      </div>

      <div className="NewsBlock__content">
        <div className="NewsBlock__title-link">
          <h2 className="NewsBlock__title">{title}</h2>
        </div>
        <p className="NewsBlock__standfirst">{led}</p>
        <div className="NewsBlock__meta">
          <date className="NewsBlock__date">
            {isToday(publishedDate)
              ? 'Today'
              : `${distanceInWordsToNow(publishedDate)} ago`}
          </date>
        </div>
      </div>
    </a>
  </li>;

NewsBlock.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    publishedDate: PropTypes.instanceOf(Date).isRequired,
    led: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
  }).isRequired,
};

export default NewsBlock;
