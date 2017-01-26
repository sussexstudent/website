import React from 'react';
import NewsBlock from './NewsBlock';

const NewsList = ({ items }) => (
  <ul className="NewsGrid">
    {items.map(item => <NewsBlock item={item} />)}
  </ul>
);

NewsList.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    pubDate: React.PropTypes.instanceOf(Date).isRequired,
    led: React.PropTypes.string.isRequired,
    imageURL: React.PropTypes.string,
  })),
};

export default NewsList;
