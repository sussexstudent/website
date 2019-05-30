import React from 'react';
import ReactDOM from 'react-dom';
import NewsList from '~components/NewsList';
import {parseNews} from "~libs/msl";

export default () => {
  const articles = parseNews(document.body);

  ReactDOM.render(
    <NewsList items={articles} />,
    document.querySelector('.app__news'),
  );
};
