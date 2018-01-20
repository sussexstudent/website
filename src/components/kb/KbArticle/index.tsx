import React from 'react';
import { compose } from 'recompose';
import { Link, RouteComponentProps } from 'react-router-dom';
import { graphql } from 'react-apollo';
import KbArticleQuery from './KbArticleQuery.graphql';
import apolloHandler, { ApolloHandlerChildProps } from '../../apolloHandler';
import { Article } from '../../../types/kb';
import StreamField from '~components/content/StreamField';
import ContentCard from "~components/ContentCard";
import {BreadcrumbBar} from "~components/BreadcrumbBar";

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
      <BreadcrumbBar color="blue">
        <Link to={`/help`}>Help</Link>
        <Link to={`/help/${article.topic.section.slug}`}>{article.topic.section.title}</Link>
        <Link to={`/help/${article.topic.section.slug}/${article.topic.slug}`}>{article.topic.title}</Link>
        <Link to={`/help/${article.topic.section.slug}/${article.topic.slug}/${article.slug}`}>{article.title}</Link>
      </BreadcrumbBar>
      <div className="Layout Layout--sidebar-right ">
        <ContentCard>
          <h1 className="type-canon">{article.title}</h1>

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
