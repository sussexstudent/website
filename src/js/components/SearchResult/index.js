import React from 'react';

function getKicker(link) {
  if (link.indexOf('/organisation') >= 0) {
    return 'Society/Sport';
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
    <li className="SearchResult__listItem">
      <a className="SearchResult__anchor" href={link}>
        <div className="SearchResult__kicker">
          {getKicker(link)}
        </div>
        <h1 className="SearchResult__title">{formatTitle(title)}</h1>
        <p className="SearchResult__snippet">{snippet}</p>
      </a>
    </li>
  );
}

SearchResult.propTypes = {
  item: React.PropTypes.shape({
    link: React.PropTypes.string,
    title: React.PropTypes.string,
    snippet: React.PropTypes.string,
  }),
};

export default SearchResult;
