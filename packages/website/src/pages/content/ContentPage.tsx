import React, { useEffect, useState } from 'react';
import { History } from 'history';
import CONTENT_PAGE_QUERY from './ContentPageQuery.graphql';
import { contentTypeMap } from './contentTypeRoutes';
import { Helmet } from 'react-helmet-async';
import { FourOhFourPage } from './FourOhFourPage';
import { useQuery } from '@apollo/react-hooks';
import qs from 'query-string';
import { ErrorState } from '../../components/ErrorState';
import { ContentWayfinder } from '../../components/Wayfinder';
import { GetContentByPathQuery } from '../../generated/graphql';
import {useToolkit} from "../../hooks/useToolkit";

interface OwnProps {
  path: string;
  history?: History;
}

type ContentPageProps = OwnProps;

const ContentPageWrapper: React.FC<{
  page: NonNullable<GetContentByPathQuery['page']>;
  ContentTemplate: any;
  loading: boolean;
}> = ({ page, ContentTemplate, loading }) => {
  useEffect(() => {
    setTimeout(() => {
      if (location.hash) {
        const node = document.getElementById(location.hash.substring(1));
        if (node) {
          node.scrollIntoView();
        }
      }
    }, 0); // todo: this is not great
  }, [page.title]);
  useToolkit('Content', { id: page.pageId, contentType: page.contentType })

  return (
    <React.Fragment>
      <Helmet title={page.seoTitle || page.title}>
        {page.searchDescription && (
          <meta name="description" content={page.searchDescription} />
        )}
      </Helmet>

      <ContentWayfinder page={page as any} />
      <div
        aria-live="polite"
        css={[
          { opacity: 1, transition: '300ms ease opacity' },
          loading && { opacity: 0.4 },
        ]}
        {...(loading ? { 'aria-busy': 'true' } : {})}
      >
        <ContentTemplate page={page} />
      </div>
    </React.Fragment>
  );
};

const ContentPage: React.FC<ContentPageProps> = ({ history, path }) => {
  const { data, loading } = useQuery<GetContentByPathQuery>(
    CONTENT_PAGE_QUERY,
    {
      variables: {
        path: path,
        previewToken: history && qs.parse(history.location.search).preview,
      },
    },
  );

  const [cachedPage, setCachedPage] = useState<{
    page: GetContentByPathQuery['page'] | undefined;
    path: string;
  }>({ page: undefined, path: path });

  useEffect(() => {
    if (data?.page && !loading) {
      setCachedPage({ page: data.page, path: data.page.path });
    }
  }, [data, loading]);

  if (!cachedPage.page) {
    return null;
  }

  const page = cachedPage.page;

  if (page === null) {
    return <FourOhFourPage />;
  }

  if (page.contentType === 'StubPage' && history) {
    history.replace(`/browse${path}`, { replace: true });
    return null;
  }
  const ContentTypeTemplate = contentTypeMap.hasOwnProperty(page.contentType)
    ? contentTypeMap[page.contentType]
    : null;

  if (ContentTypeTemplate) {
    return (
      <ContentPageWrapper
        ContentTemplate={ContentTypeTemplate}
        page={page}
        loading={loading}
      />
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
