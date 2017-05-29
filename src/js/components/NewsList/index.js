import React from 'react';
import NewsBlock from './NewsBlock';

const NewsList = ({ items }) => (
  <ul className="NewsGrid">
    {items.map(item => <NewsBlock item={item} key={item.id} />)}
  </ul>
);

NewsList.propTypes = {
  items: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      link: React.PropTypes.string.isRequired,
      publishedDate: React.PropTypes.instanceOf(Date).isRequired,
      led: React.PropTypes.string.isRequired,
      imageURL: React.PropTypes.string,
    })
  ).isRequired,
};

export default NewsList;
