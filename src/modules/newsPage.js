import React from 'react';
import ReactDOM from 'react-dom';
import NewsList from '~components/NewsList';
import { parseNews } from '~libs/msl';

export default () => {
  let articles = parseNews(document.body);
  if (articles.length > 40) {
    articles = articles.slice(0, 40);
  }

  ReactDOM.render(
    <NewsList items={articles} fullWidth />,
    document.querySelector('.app__news_page'),
  );
};
