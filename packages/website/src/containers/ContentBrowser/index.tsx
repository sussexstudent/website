import React from 'react';
import CONTENT_BROWSER_QUERY from './ContentBrowserQuery.graphql';
import { ContentBrowserPage } from '../content/types';
import { ContentBrowser } from '../../components/ContentBrowser';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

interface Result {
  page: ContentBrowserPage;
}

export const ContentBrowserContainer: React.FC<RouteComponentProps> = (
  props,
) => {
  const { data, loading } = useQuery<Result>(CONTENT_BROWSER_QUERY);
  if (!data || loading) return null;

  return (
    <div className="LokiContainer">
      <ContentBrowser
        pages={data.page}
        segments={props.location.pathname
          .split('/')
          .filter((part) => part !== '')
          .slice(1)}
      />
    </div>
  );
};
