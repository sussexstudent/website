import React from 'react';
import { HandledQuery } from '../../../../components/HandledQuery';

import CONTENT_BROWSER_QUERY from './ContentBrowserQuery.graphql';
import { ContentBrowserPage } from '../content/types';
import { ContentBrowser } from '~website/components/ContentBrowser';

interface ContentBrowserProps {
  '*': string;
}

interface Result {
  page: ContentBrowserPage;
}

class ContentBrowserQuery extends HandledQuery<Result, {}> {}

const ContentBrowserContainer: React.SFC<ContentBrowserProps> = (props) => (
  <div className="LokiContainer">
    <ContentBrowserQuery query={CONTENT_BROWSER_QUERY}>
      {({ data }) => {
        if (!data) return null;

        return (
          <ContentBrowser pages={data.page} segments={props['*'].split('/')} />
        );
      }}
    </ContentBrowserQuery>
  </div>
);

export default ContentBrowserContainer;
