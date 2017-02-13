import React from 'react';

function getKicker(link) {
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

function formatTitle(title) {
  const pageTitleEnding = /\| Sussex Students' Union$/;
  return title.replace(pageTitleEnding, '');
}

function SearchResult(props) {
  const { link, title, snippet } = props.item;

  return (
    <li className="ResultsList__result">
      <a className="ResultsList__link" href={link}>
        <div className="ResultsList__kicker">
          {getKicker(link)}
        </div>
        <h1 className="ResultsList__title">{formatTitle(title)}</h1>
        <p className="ResultsList__snippet">{snippet}</p>
      </a>
    </li>
  );
}

SearchResult.propTypes = {
  item: React.PropTypes.shape({
    link: React.PropTypes.string,
    title: React.PropTypes.string,
    snippet: React.PropTypes.string,
  }).isRequired,
};

export default SearchResult;
