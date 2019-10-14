import React from 'react';
import CONTENT_BROWSER_QUERY from './ContentBrowserQuery.graphql';
import { ContentBrowserPage } from '../../pages/content/types';
import { ContentBrowser } from '../../components/ContentBrowser';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

interface Result {
  page: ContentBrowserPage;
}

export interface ContentBrowserContainer extends RouteComponentProps {}

export const ContentBrowserContainer: React.FC<ContentBrowserContainer> = (
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