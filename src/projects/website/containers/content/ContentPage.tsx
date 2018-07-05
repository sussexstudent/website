import React from 'react';
import CONTENT_PAGE_QUERY from './ContentPageQuery.graphql';
import pageMap from '~website/containers/content/pageMap';
import { HandledQuery } from '~components/HandledQuery';
import Helmet from 'react-helmet';
import {FourOhFourPage} from "./FourOhFourPage";

interface OwnProps {
  path: string;
}

interface Result {
  page: {
    title: string;
    data: any;
    type: string;

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

        const Component = pageMap.hasOwnProperty(page.type)
          ? pageMap[page.type]
          : null;

        if (Component) {
          return (
            <React.Fragment>
              <Helmet title={page.seoTitle || page.title}>
                {page.searchDescription && <meta name="description" content={page.searchDescription} />}
              </Helmet>

              <Component page={page} />
            </React.Fragment>
          );
        }

        return (
          <div className="Layout">
            <h1>Page type can't be found: "{page.type}"</h1>
          </div>
        );
      }}
    </ContentPageQuery>
  );
};

export { ContentPage };
