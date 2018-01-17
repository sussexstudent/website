import React from 'react';
import { has } from 'lodash';
import HydroLeaf from '~components/HydroLeaf';
import Loader from '~components/Loader';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';
import pageComponents from './pageMap';

interface IProps {
  contentAPIStore: any; // todo
  pageId: number;
}

interface IState {
  isLoading: boolean;
  isLoaded: boolean;
  data: any; // todo
  isError: boolean;
  error: Error | null;
}

class ContentAPIComposer extends React.Component<IProps, IState> {
  static defaultValues = {
    contentAPIStore: {},
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoading: false,
      isLoaded: false,
      data: null,
      error: null,
      isError: false,
    };

    this.getPageId = this.getPageId.bind(this);
  }

  componentWillMount() {
    if (!this.state.isLoading && !this.state.isLoaded) {
      if (
        this.props.contentAPIStore &&
        Object.hasOwnProperty.call(
          this.props.contentAPIStore,
          this.props.pageId
        )
      ) {
        this.setState({
          isLoaded: true,
          isLoading: false,
          data: this.props.contentAPIStore[this.props.pageId],
        });
        return;
      }

      fetch(
        `${getFalmerEndpoint()}/content-api/v2/pages/${this.props.pageId}/`,
        {
          headers: {
            Accept: 'application/json, text/plain, */*',
          },
        }
      )
        .then(data => data.json())
        .then(json =>
          this.setState({ isLoaded: true, isLoading: false, data: json })
        )
        .catch(error =>
          this.setState({
            isLoading: false,
            isLoaded: false,
            isError: true,
            data: error,
          })
        );
    }
  }

  getPageId() {
    return this.props.pageId;
  }

  render() {
    if (!this.state.isLoaded && !this.state.isError) {
      return <Loader dark />;
    }

    if (this.state.isError) {
      console.log(this.state.data);
      return <h2>An error happened!</h2>;
    }

    if (!has(this.state, 'data.meta.type')) {
      console.warn(
        `[contentAPI] response did not specific content type. Page ID: ${
          this.props.pageId
        }`
      );
      return <h2>Sorry! something has gone wrong.</h2>;
    }

    const contentType = this.state.data.meta.type;

    if (!Object.hasOwnProperty.call(pageComponents, contentType)) {
      console.warn(
        `[contentAPI] Content type does not exist! Tried to render: ${
          contentType
        }`
      );
      return <h2>Sorry! something has gone wrong.</h2>;
    }
    const Page = pageComponents[contentType];

    return <Page data={this.state.data} />;
  }
}

export default HydroLeaf({
  contextToProps: {
    contentAPI: 'contentAPIStore',
  },
})(ContentAPIComposer);

export const WithoutSSR = HydroLeaf({
  contextToProps: {
    contentAPI: 'contentAPIStore',
  },
  disableSSR: true,
})(ContentAPIComposer);
