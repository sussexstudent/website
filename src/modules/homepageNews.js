import React from 'react';
import { parseNews } from 'msl-utils';
import ReactDOM from 'react-dom';
import NewsList from '~components/NewsList';

export default () => {
  const articles = parseNews(document.body);

  ReactDOM.render(
    <NewsList items={articles} />,
    document.querySelector('.app__news'),
  );
};
