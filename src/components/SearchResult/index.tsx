import React from 'react';
import { Event } from '~types/events';
import { StudentGroup } from '~components/OrganisationGrid';
import { ContentBrowserPage } from '~website/containers/content/types';

const EventSearchResult = ({
  item: { slug, id, title, shortDescription },
}: {
  item: Event;
}) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={`/whats-on/${slug}-${id}`}>
      <div className="ResultsList__kicker">Event</div>
      <h1 className="ResultsList__title">{title}</h1>
      <p className="ResultsList__snippet">{shortDescription}</p>
    </a>
  </li>
);

const StudentGroupSearchResult = ({
  item: { name, link, description },
}: {
  item: StudentGroup;
}) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={link}>
      <div className="ResultsList__kicker">Sports & Societies</div>
      <h1 className="ResultsList__title">{name}</h1>
      <p className="ResultsList__snippet">{description}</p>
    </a>
  </li>
);

const ContentSearchResult = ({
  item: { path, title, searchDescription },
}: {
  item: ContentBrowserPage;
}) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={path}>
      <div className="ResultsList__kicker">Page</div>
      <h1 className="ResultsList__title">{title}</h1>
      <p className="ResultsList__snippet">{searchDescription}</p>
    </a>
  </li>
);

const MSLPageSearchResult = ({
  item: { link, title, description },
}: {
  item: any;
}) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={link}>
      <div className="ResultsList__kicker">Page</div>
      <h1 className="ResultsList__title">{title}</h1>
      <p className="ResultsList__snippet">{description}</p>
    </a>
  </li>
);

const MSLNewsResult = ({
  item: { link, title, searchDescription },
}: {
  item: any;
}) => (
  <li className="ResultsList__result">
    <a className="ResultsList__link" href={link}>
      <div className="ResultsList__kicker">Article</div>
      <h1 className="ResultsList__title">{title}</h1>
      <p className="ResultsList__snippet">{searchDescription}</p>
    </a>
  </li>
);

export interface SearchResult {
  id: string;
  __typename: string;
  title: string;
  slug: string;
  description: string;
}

interface IProps {
  type: string;
  item: SearchResult;
}

function SearchResult(props: IProps) {
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

  console.log('Search result render fell through');
  return null;
}

export default SearchResult;
