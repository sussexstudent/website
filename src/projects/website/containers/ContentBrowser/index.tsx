import React from 'react';
import CONTENT_BROWSER_QUERY from './ContentBrowserQuery.graphql';
import { ContentBrowserPage } from '../content/types';
import { ContentBrowser } from '~website/components/ContentBrowser';
import { RouteComponentProps } from 'react-router';
import { useQuery } from 'react-apollo-hooks';

interface ContentBrowserProps extends RouteComponentProps<{}> {}

interface Result {
  page: ContentBrowserPage;
}

const ContentBrowserContainer: React.FC<ContentBrowserProps> = (props) => {
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

export default ContentBrowserContainer;
