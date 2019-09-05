import React, { useEffect, useState } from 'react';
import { History } from 'history';
import CONTENT_PAGE_QUERY from './ContentPageQuery.graphql';
import { contentTypeMap } from './contentTypeRoutes';
import Helmet from 'react-helmet';
import { FourOhFourPage } from './FourOhFourPage';
import { useQuery } from '@apollo/react-hooks';
import qs from 'query-string';
import { ErrorState } from '../../components/ErrorState';

interface OwnProps {
  path: string;
  history?: History;
}

interface Result {
  page: {
    title: string;
    data: any;
    contentType: string;
    path: string;

    seoTitle: string;
    searchDescription: string;
  };
}

type IProps = OwnProps;

const ContentPage: React.FC<IProps> = (props: IProps) => {
  const { data, loading } = useQuery<Result>(CONTENT_PAGE_QUERY, {
    variables: {
      path: props.path,
      previewToken:
        props.history && qs.parse(props.history.location.search).preview,
    },
  });

  const [cachedPage, setCachedPage] = useState<{
    page: Result | undefined;
    path: string;
  }>({ page: undefined, path: props.path });

  useEffect(() => {
    if (data && !loading) {
      setCachedPage({ page: data, path: data.page.path });
    }
  }, [data, loading]);

  if (!cachedPage.page) {
    return null;
  }

  const page = cachedPage.page.page;

  if (page === null) {
    return <FourOhFourPage />;
  }

  if (page.contentType === 'StubPage' && props.history) {
    props.history.replace(`/browse${props.path}`, { replace: true });
    return null;
  }
  const ContentTypeTemplate = contentTypeMap.hasOwnProperty(page.contentType)
    ? contentTypeMap[page.contentType]
    : null;

  if (ContentTypeTemplate) {
    return (
      <React.Fragment>
        <Helmet title={page.seoTitle || page.title}>
          {page.searchDescription && (
            <meta name="description" content={page.searchDescription} />
          )}
        </Helmet>

        <div
          aria-live="polite"
          css={[
            { opacity: 1, transition: '300ms ease opacity' },
            loading && { opacity: 0.4 },
          ]}
          {...(loading ? { 'aria-busy': 'true' } : {})}
        >
          <ContentTypeTemplate page={page} />
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="LayoutContent">
      <ErrorState
        title="This page is missing a template"
        description={`Content Type "${page.contentType}" is missing from the contentTypeMap.`}
      />
    </div>
  );
};

export { ContentPage };
