import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import KbHomeQuery from './KbHomeQuery.graphql';
import apolloHandler, { ApolloHandlerChildProps } from '../../apolloHandler';
import { Section } from '../../../types/kb';
import {BreadcrumbBar} from "~components/BreadcrumbBar";

interface Result {
  knowledgeBase: {
    sections: Array<Section>;
  };
}

type IProps = ApolloHandlerChildProps<{}, Result>;

function KbHome(props: IProps) {
  return (
    <div>
      <BreadcrumbBar>
        <Link to="/help">Help</Link>
      </BreadcrumbBar>
      <input
        className="HeaderSearch HeaderSearch--search-icon ActivitiesApp__search-input"
        type="search"
        placeholder="How can we help?"
      />
      <ul>
        {props.data.knowledgeBase.sections.map((section) => (
          <li>
            <Link to={`/help/${section.slug}`}>
              <h2>{section.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default compose<IProps, {}>(graphql(KbHomeQuery), apolloHandler())(
  KbHome,
);
