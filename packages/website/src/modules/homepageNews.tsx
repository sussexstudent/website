import React from 'react';
import ReactDOM from 'react-dom';
import { NewsList } from '../components/NewsList';
import { parseNews } from '@ussu/common/src/libs/msl';

export default () => {
  const articles = parseNews(document.body);
  const news_pathname = window.location.pathname;
  for (const article of articles) {
    const index = article.link.indexOf('/news/');
    if (article.link.substring(index) === news_pathname) {
      articles.splice(article.id, 1);
    }
  }

  ReactDOM.render(
    <NewsList items={articles} fullWidth={false} />,
    document.querySelector('.app__news'),
  );
};
