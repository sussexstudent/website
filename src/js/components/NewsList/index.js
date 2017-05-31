import React from 'react';
import PropTypes from 'prop-types';
import NewsBlock from './NewsBlock';

const NewsList = ({ items }) => (
  <ul className="NewsGrid">
    {items.map(item => <NewsBlock item={item} key={item.id} />)}
  </ul>
);

NewsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      publishedDate: PropTypes.instanceOf(Date).isRequired,
      led: PropTypes.string.isRequired,
      imageURL: PropTypes.string,
    })
  ).isRequired,
};

export default NewsList;
