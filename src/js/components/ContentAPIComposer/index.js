import React from 'react';
import PropTypes from 'prop-types';
import HydroLeaf from '@ussu/components/HydroLeaf';
import Loader from '@ussu/components/Loader';
import StaffList from '@ussu/components/StaffList';
import HeadingHero from '@ussu/components/HeadingHero';
import SelectionGrid from '@ussu/components/SelectionGrid';
import SelectionGridItem from '@ussu/components/SelectionGridItem';

function getEndpoint(forceProd = false) {
  if (forceProd) {
    return 'https://falmer.sussexstudent.com';
  }

  if (process.env.NODE_ENV === 'production') {
    return process.env.FALMER_ENDPOINT;
  }

  return window.location.pathname.startsWith('/~/')
    ? process.env.FALMER_ENDPOINT
    : 'https://falmer.sussexstudent.com';
}

/* eslint-disable react/prop-types */
const components = {
  heading: ({ value }) => <h1>{value}</h1>,
  heading_hero: ({ value, document }) => (
    <HeadingHero
      title={value.heading || document.title}
      imageURL={value.image.resource}
    />
  ),
  staff_list: StaffList,
  selection_grid: ({ value }) => (
    <SelectionGrid>
      {value.map(item => (
        <SelectionGridItem
          title={item.title}
          link={item.link}
          imageURL={item.image.resource}
        />
      ))}
    </SelectionGrid>
  ),
};

function getComponent(component, data, key) {
  if (!Object.hasOwnProperty.call(components, component.type)) {
    console.warn(
      `[contentAPI] Requested component not found! ${component.type} is missing.`
    );
    return null;
  }

  return React.createElement(components[component.type], {
    value: component.value,
    document: data,
    key,
  });
}

const ComponentStreamPage = ({ data: { body }, data }) => (
  <div>
    {body.map((component, index) => getComponent(component, data, index))}
  </div>
);

const pageComponents = {
  'content.StaffPage': ComponentStreamPage,
  'content.SelectionGridPage': ComponentStreamPage,
};

/* eslint-enable react/prop-types */

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

      fetch(`${getEndpoint(true)}/content-api/v2/pages/${this.props.pageId}/`)
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

    const contentType = this.state.data.meta.type;
    if (!Object.hasOwnProperty.call(pageComponents, contentType)) {
      console.warn(
        `[contentAPI] Content type does not exist! Tried to render: ${contentType}`
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
  contentAPI: 'contentAPIStore',
})(ContentAPIComposer);