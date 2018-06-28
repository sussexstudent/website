import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import KB_SECTION_QUERY from './KbSectionQuery.graphql';
import { Section } from '~types/kb';
import { ContentBreadcrumbBar } from '~components/BreadcrumbBar';
import ContentCard from '~components/ContentCard';
import { HandledQuery } from '~components/HandledQuery';

interface RouteParams {
  sectionSlug: string;
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

interface Result {
  knowledgeBase: {
    section: Section;
  };
}

type IProps = OwnProps & { data: Result };

class KbSectionQuery extends HandledQuery<Result, {}> {}

function KbSectionComponent(props: IProps) {
  const section = props.data.knowledgeBase.section;
  return (
    <div>
      <ContentBreadcrumbBar page={props.data.knowledgeBase.section} />

      <h1>{section.title}</h1>
      <ul>
        {section.topics.map((topic) => (
          <li>
            <ContentCard>
              <Link to={`/kb/${section.slug}/${topic.slug}`}>
                <h2>{topic.title}</h2>
                <ul>
                  {topic.articles.map((article) => (
                    <li>
                      <Link
                        to={`/kb/${section.slug}/${topic.slug}/${article.slug}`}
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

function KbSectionConnector(props: OwnProps) {
  return (
    <KbSectionQuery
      query={KB_SECTION_QUERY}
      variables={{
        sectionSlug: props.match.params.sectionSlug,
      }}
    >
      {({ data }) => {
        if (!data) {
          return;
        }

        return <KbSectionComponent {...props} data={data} />;
      }}
    </KbSectionQuery>
  );
}

export default KbSectionConnector;
