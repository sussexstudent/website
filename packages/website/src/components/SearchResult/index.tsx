import React from 'react';
import { Event } from '@ussu/common/src/types/events';
import { ContentBrowserPage } from '../../pages/content/types';
import { StudentGroup } from '@ussu/common/src/types/groups';

const EventSearchResult: React.FC<{
  item: Event;
}> = ({ item: { slug, id, title, shortDescription } }) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={`/whats-on/${slug}-${id}`}>
      <div className="ResultsList__kicker">Event</div>
      <h1 className="ResultsList__title">{title}</h1>
      <p className="ResultsList__snippet">{shortDescription}</p>
    </a>
  </li>
);

const StudentGroupSearchResult: React.FC<{
  item: StudentGroup;
}> = ({ item: { name, link, description } }) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={link}>
      <div className="ResultsList__kicker">Sports & Societies</div>
      <h1 className="ResultsList__title">{name}</h1>
      <p className="ResultsList__snippet">{description}</p>
    </a>
  </li>
);

const ContentSearchResult: React.FC<{
  item: ContentBrowserPage;
}> = ({ item: { path, title, searchDescription } }) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={path}>
      <div className="ResultsList__kicker">Page</div>
      <h1 className="ResultsList__title">{title}</h1>
      <p className="ResultsList__snippet">{searchDescription}</p>
    </a>
  </li>
);

const MSLPageSearchResult: React.FC<{
  item: any;
}> = ({ item: { link, title, description } }) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={link}>
      <div className="ResultsList__kicker">Page</div>
      <h1 className="ResultsList__title">{title}</h1>
      <p className="ResultsList__snippet">{description}</p>
    </a>
  </li>
);

const MSLNewsResult: React.FC<{
  item: any;
}> = ({ item: { link, title, searchDescription } }) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={link}>
      <div className="ResultsList__kicker">Article</div>
      <h1 className="ResultsList__title">{title}</h1>
      <p className="ResultsList__snippet">{searchDescription}</p>
    </a>
  </li>
);

export interface SearchResultData {
  id: string;
  __typename: string;
  title: string;
  slug: string;
  description: string;
}

interface SearchResultProps {
  type: string;
  item: SearchResultData;
}

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { type } = props;

  if (type === 'Event') {
    return <EventSearchResult item={props.item as any} />;
  }

  if (type === 'StudentGroup') {
    return <StudentGroupSearchResult item={props.item as any} />;
  }

  if (type === 'PageResult') {
    return <ContentSearchResult item={props.item as any} />;
  }

  if (type === 'MSLPageResult') {
    return <MSLPageSearchResult item={props.item as any} />;
  }

  if (type === 'MSLNewsResult') {
    return <MSLNewsResult item={props.item as any} />;
  }

  console.warn('Search result render fell through', type);
  return null;
};
