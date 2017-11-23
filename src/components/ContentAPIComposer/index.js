import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import HydroLeaf from '~components/HydroLeaf';
import Loader from '~components/Loader';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';
import pageComponents from './pageMap';

class ContentAPIComposer extends React.Component {
  constructor(props, c) {
    super(props, c);

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

ContentAPIComposer.propTypes = {
  pageId: PropTypes.number.isRequired,
  // eslint-disable-next-line
  contentAPIStore: PropTypes.object,
};

ContentAPIComposer.defaultValues = {
  contentAPIStore: {},
};

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
