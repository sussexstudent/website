import React from 'react';
import CONTENT_PAGE_QUERY from './ContentPageQuery.graphql';
import pageMap from '~website/containers/content/pageMap';
import { HandledQuery } from '~components/HandledQuery';
import Helmet from 'react-helmet';
import { FourOhFourPage } from './FourOhFourPage';
import { NavigateFn } from '@reach/router';

interface OwnProps {
  path: string;
  navigate?: NavigateFn;
}

interface Result {
  page: {
    title: string;
    data: any;
    contentType: string;

    seoTitle: string;
    searchDescription: string;
  };
}

class ContentPageQuery extends HandledQuery<Result, {}> {}

type IProps = OwnProps;

const ContentPage: React.SFC<IProps> = (props: IProps) => {
  return (
    <ContentPageQuery
      query={CONTENT_PAGE_QUERY}
      variables={{
        path: props.path,
      }}
    >
      {({ data }) => {
        if (!data) {
          return;
        }

        const page = data.page;

        if (page === null) {
          return <FourOhFourPage />;
        }

        if (page.contentType === 'StubPage' && props.navigate) {
          props.navigate(`/browse${props.path}`, { replace: true });
          return null;
        }

        const Component = pageMap.hasOwnProperty(page.contentType)
          ? pageMap[page.contentType]
          : null;

        if (Component) {
          return (
            <React.Fragment>
              <Helmet title={page.seoTitle || page.title}>
                {page.searchDescription && (
                  <meta name="description" content={page.searchDescription} />
                )}
              </Helmet>

              <Component page={page} />
            </React.Fragment>
          );
        }

        return (
          <div className="Layout">
            <h1>Page type can't be found: "{page.contentType}"</h1>
          </div>
        );
      }}
    </ContentPageQuery>
  );
};

export { ContentPage };
