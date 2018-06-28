import React from 'react';
import { Link } from 'react-router-dom';
import KB_HOME_QUERY from './KbHomeQuery.graphql';
import { Section } from '~types/kb';
import { ContentBreadcrumbBar } from '~components/BreadcrumbBar';
import { HandledQuery } from '~components/HandledQuery';

interface Result {
  knowledgeBase: {
    sections: Section[];
  };
}

class KbHomeQuery extends HandledQuery<Result, {}> {}

function KbHome() {
  return (
    <KbHomeQuery query={KB_HOME_QUERY}>
      {({ data }) => {
        if (!data) {
          return;
        }

        const knowledgeBase = data.knowledgeBase;

        return (
          <div>
            <ContentBreadcrumbBar page={knowledgeBase} />

            <input
              className="HeaderSearch HeaderSearch--search-icon ActivitiesApp__search-input"
              type="search"
              placeholder="How can we help?"
            />
            <ul>
              {knowledgeBase.sections.map((section) => (
                <li>
                  <Link to={`/kb/${section.slug}`}>
                    <h2>{section.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </KbHomeQuery>
  );
}
export default KbHome;
