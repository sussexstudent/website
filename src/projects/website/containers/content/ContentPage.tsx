import React from 'react';
import { History } from 'history';
import CONTENT_PAGE_QUERY from './ContentPageQuery.graphql';
import ctRoutes from '~website/containers/content/contentTypeRoutes';
import { HandledQuery } from '~components/HandledQuery';
import Helmet from 'react-helmet';
import { FourOhFourPage } from './FourOhFourPage';
import { Switch } from 'react-router';

interface OwnProps {
  path: string;
  history?: History;
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

const ContentPage: React.FC<IProps> = (props: IProps) => {
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

        if (page.contentType === 'StubPage' && props.history) {
          props.history.replace(`/browse${props.path}`, { replace: true });
          return null;
        }

        const RoutesForContentType = ctRoutes.hasOwnProperty(page.contentType)
          ? ctRoutes[page.contentType]
          : null;

        if (RoutesForContentType) {
          return (
            <React.Fragment>
              <Helmet title={page.seoTitle || page.title}>
                {page.searchDescription && (
                  <meta name="description" content={page.searchDescription} />
                )}
              </Helmet>

              <Switch>
                <RoutesForContentType page={page} />
              </Switch>
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
