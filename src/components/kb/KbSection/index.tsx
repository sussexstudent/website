import React from 'react';
import { compose } from 'recompose';
import { Link, RouteComponentProps } from 'react-router-dom';
import { graphql } from 'react-apollo';
import KbSectionQuery from './KbSectionQuery.graphql';
import apolloHandler, { ApolloHandlerChildProps } from '../../apolloHandler';
import { Section } from '../../../types/kb';
import {BreadcrumbBar} from "~components/BreadcrumbBar";
import ContentCard from "~components/ContentCard";

interface RouteParams {
  sectionSlug: string;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

interface Result {
  knowledgeBase: {
    section: Section;
  };
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>;

function KbSection(props: IProps) {
  const section = props.data.knowledgeBase.section;
  return (
    <div>
      <BreadcrumbBar color="blue">
        <Link to={`/help`}>Help</Link>
        <Link to={`/help/${section.slug}`}>{section.title}</Link>
      </BreadcrumbBar>

      <h1>{section.title}</h1>
      <ul>
        {section.topics.map((topic) => (
          <li>
            <ContentCard>
              <Link to={`/help/${section.slug}/${topic.slug}`}>
                <h2>{topic.title}</h2>
                <ul>
                  {topic.articles.map((article) => (
                    <li>
                      <Link
                        to={`/help/${section.slug}/${topic.slug}/${article.slug}`}
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Link>
            </ContentCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default compose<IProps, OwnProps>(
  graphql<Result, OwnProps>(KbSectionQuery, {
    options: (props) => ({
      variables: {
        sectionSlug: props.match.params.sectionSlug,
      },
    }),
  }),
  apolloHandler(),
)(KbSection);
