import React from 'react';
import Loader from '../Loader';
import StaffList from '../StaffList';

/* eslint-disable react/prop-types */
const components = {
  heading: ({ value }) => <h1>{value}</h1>,
  staff_list: StaffList,
};

function getComponent(component) {
  if (!Object.hasOwnProperty.call(components, component.type)) {
    console.warn(`Requested component not found! ${component.type} is missing.`);
    return null;
  }

  return React.createElement(components[component.type], { value: component.value });
}

const pageComponents = {
  'content.StaffPage': ({ data: { body } }) => <div>{body.map(component => getComponent(component))}</div>,
};

/* eslint-enable react/prop-types */

class ContentAPIComposer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoaded: false,
      data: null,
      error: null,
      isError: false,
    };
  }

  componentWillMount() {
    if (!this.state.isLoading && !this.state.isLoaded) {
      fetch(`${process.env.FALMER_ENDPOINT}/content-api/v2/pages/${this.props.pageId}/`)
        .then(data => data.json())
        .then(json => this.setState({ isLoaded: true, isLoading: false, data: json }))
        .catch(error => this.setState({ isLoading: false, isLoaded: false, isError: true, data: error }));
    }
  }

  render() {
    if (!this.state.isLoaded && !this.state.isError) {
      return <Loader dark />;
    }

    const Page = pageComponents[this.state.data.meta.type];

    return (
      <Page data={this.state.data} />
    );
  }
}

ContentAPIComposer.propTypes = {
  pageId: React.PropTypes.number.isRequired,
};

ContentAPIComposer.defaultProps = {
  pageId: 3,
};

export default ContentAPIComposer;
