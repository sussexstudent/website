import React from 'react';
import ReactDOM from 'react-dom';
import NewsList from '../../components/NewsList';

export default () => {
  const articles = [...document.querySelectorAll('.news_full .news_item')].map((item, index) => {
    const anchor = item.querySelector('h5 a');
    const image = item.querySelector('.news_image img');
    return {
      id: index,
      title: anchor.innerText.replace(' ', ' ').replace('&nbsp;', ' '),
      link: anchor.href,
      led: item.querySelector('.leader').innerText,
      pubDate: new Date(item.querySelector('.msl_pubdate').innerText),
      imageURL: image ? image.src : null,
    };
  });

  ReactDOM.render(<NewsList items={articles} />, document.querySelector('.app__news'));
};
