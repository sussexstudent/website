import React from 'react';
import { compose } from 'recompose';
import { RouteComponentProps } from 'react-router-dom';
import { graphql } from 'react-apollo';
import KbArticleQuery from './KbArticleQuery.graphql';
import apolloHandler, { ApolloHandlerChildProps } from '../../apolloHandler';
import { Article } from '../../../types/kb';
import StreamField from '~components/content/StreamField';
import BackBar from '~components/BackBar/Link';

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
      <BackBar color="blue" to={`/help/${article.topic.section.slug}`}>
        {article.topic.section.title}
      </BackBar>

      <h1>{article.title}</h1>

      <StreamField page={article} items={article.main} />
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
