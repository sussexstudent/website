import React from 'react';
import apolloHandler, {ApolloHandlerChildProps} from "~components/apolloHandler";
import ContentPageQuery from './ContentPageQuery.graphql';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import pageMap from "~components/content/pageMap";

interface OwnProps {
  path: string;
}

interface Result {
  page: {
    title: string;
    data: any;
    type: string;
  }
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>;

class ContentPageComponent extends React.Component<IProps> {

  render() {
    const page = this.props.data.page;
    const Component = pageMap.hasOwnProperty(page.type) ? pageMap[page.type] : null;

    if (Component) {
      return <Component page={page} />;
    }

    console.log('page map', pageMap);
    return (
      <div className="Layout">
        <h1>Page type can't be found: "{page.type}"</h1>
      </div>
    );
  }
}


const ContentPage = compose<IProps, OwnProps>(
  graphql<Result, OwnProps>(ContentPageQuery, {
    options: (props) => ({
      variables: {
        path: props.path,
      }
    })
  }),
  apolloHandler(),
)(ContentPageComponent);


export { ContentPage };
