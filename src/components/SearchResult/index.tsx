import React from 'react';

function getKicker(link: string) {
  if (link.indexOf('/organisation') >= 0) {
    return 'Sports & Societies';
  }

  if (link.indexOf('/event') >= 0) {
    return 'Event';
  }

  if (link.indexOf('/ents/event') >= 0) {
    return 'Event';
  }

  if (link.endsWith('.pdf')) {
    return 'PDF Document';
  }

  if (link.indexOf('/elections/manifesto') >= 0) {
    return 'Manifesto';
  }

  if (link.indexOf('/news/article') >= 0) {
    return 'Article';
  }

  return 'Page';
}

function formatTitle(title: string) {
  const pageTitleEnding = /\| Sussex Students' Union$/;
  return title.replace(pageTitleEnding, '');
}

export interface SearchResult {
  link: string;
  title: string;
  description: string;
}

interface IProps {
  item: SearchResult
}

function SearchResult(props: IProps) {
  const { link, title, description } = props.item;

  return (
    <li className="ResultsList__result">
      <a className="ResultsList__link" href={link}>
        <div className="ResultsList__kicker">{getKicker(link)}</div>
        <h1 className="ResultsList__title">{formatTitle(title)}</h1>
        <p className="ResultsList__snippet">{description}</p>
      </a>
    </li>
  );
}

export default SearchResult;
