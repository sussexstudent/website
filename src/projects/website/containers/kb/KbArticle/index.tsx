import React from 'react';
import format from 'date-fns/format';
import { RouteComponentProps } from 'react-router-dom';
import KB_ARTICLE_QUERY from './KbArticleQuery.graphql';
import { Article } from '~types/kb';
import StreamField from '~website/containers/content/StreamField';
import ContentCard from '~components/ContentCard';
import { ContentBreadcrumbBar } from '~components/BreadcrumbBar';
import { HandledQuery } from '~components/HandledQuery';

interface RouteParams {
  sectionSlug: string;
  topicSlug: string;
  articleSlug: string;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

interface Result {
  knowledgeBase: {
    article: Article;
  };
}

type IProps = OwnProps;

class ArticleQuery extends HandledQuery<Result, { articlePath: string }> {}

function KbArticle(props: IProps) {
  return (
    <ArticleQuery
      query={KB_ARTICLE_QUERY}
      variables={{
        articlePath: [
          props.match.params.sectionSlug,
          props.match.params.topicSlug,
          props.match.params.articleSlug,
        ].join('/'),
      }}
    >
      {({ data }) => {
        if (!data) {
          return;
        }

        const article = data && data.knowledgeBase.article;

        return (
          <div>
            <ContentBreadcrumbBar page={article} />

            <div className="Layout Layout--sidebar-right ">
              <ContentCard>
                <h1 className="type-canon">{article.title}</h1>
                <div className="type-long-primer">
                  last updated:{' '}
                  {format(new Date(article.lastPublishedAt), 'd/MM/YYYY')}
                </div>
                <StreamField page={article} items={article.main} />
              </ContentCard>
            </div>
          </div>
        );
      }}
    </ArticleQuery>
  );
}
export default KbArticle;
