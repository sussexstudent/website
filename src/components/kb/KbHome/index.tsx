import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import KbHomeQuery from './KbHomeQuery.graphql';
import apolloHandler, { ApolloHandlerChildProps } from '../../apolloHandler';
import { Section } from '../../../types/kb';

interface Result {
  knowledgeBase: {
    sections: Array<Section>;
  };
}

type IProps = ApolloHandlerChildProps<{}, Result>;

function KbHome(props: IProps) {
  return (
    <div>
      <h1>Homepage</h1>
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
