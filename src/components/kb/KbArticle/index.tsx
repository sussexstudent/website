import React from 'react';
import { compose } from 'recompose';
import format from 'date-fns/format';
import { RouteComponentProps } from 'react-router-dom';
import { graphql } from 'react-apollo';
import KbArticleQuery from './KbArticleQuery.graphql';
import apolloHandler, { ApolloHandlerChildProps } from '../../apolloHandler';
import { Article } from '../../../types/kb';
import StreamField from '~components/content/StreamField';
import ContentCard from "~components/ContentCard";
import {ContentBreadcrumbBar} from "~components/BreadcrumbBar";

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

type IProps = ApolloHandlerChildProps<OwnProps, Result>;

function KbArticle(props: IProps) {
  const article = props.data.knowledgeBase.article;
  return (
    <div>
      <ContentBreadcrumbBar page={props.data.knowledgeBase.article} />

      <div className="Layout Layout--sidebar-right ">
        <ContentCard>
          <h1 className="type-canon">{article.title}</h1>
          <div className="type-long-primer">last updated: {format(new Date(article.lastPublishedAt), 'DD/MM/YY')}</div>
          <StreamField page={article} items={article.main} />
        </ContentCard>
      </div>
    </div>
  );
}
export default compose<IProps, OwnProps>(
  graphql<Result, OwnProps>(KbArticleQuery, {
    options: (props) => ({
      variables: {
        articlePath: [
          props.match.params.sectionSlug,
          props.match.params.topicSlug,
          props.match.params.articleSlug,
        ].join('/'),
      },
    }),
  }),
  apolloHandler(),
)(KbArticle);
