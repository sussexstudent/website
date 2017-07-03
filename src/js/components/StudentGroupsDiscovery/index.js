import React from 'react';
import PropTypes from 'prop-types';
import keyBy from 'lodash/keyBy';
import Fuse from 'fuse.js';
import { forceCheck } from 'react-lazyload';
import HydroLeaf from '../../components/HydroLeaf';
import OrgansiationGrid from '../../components/OrgansiationGrid';
import getFalmerEndpoint from '../../libs/getFalmerEndpoint';
import Loader from '../Loader/index';

class StudentGroupsDiscovery extends React.Component {
  constructor(props) {
    super(props);

    this.fuse = new Fuse(props.groupsList, { keys: ['name'], id: 'id' });

    this.state = {
      filter: null,
      searchValue: '',
      displayIds: props.groupsList.map(group => group.id),
    };

    this.onSearchUpdate = this.onSearchUpdate.bind(this);
  }

  onSearchUpdate(e) {
    const searchValue = e.target.value;
    this.setState(
      {
        searchValue,
        displayIds: searchValue
          ? this.fuse.search(searchValue)
          : this.props.groupsList.map(group => group.id),
      },
      () => {
        forceCheck();
      }
    );
  }

  render() {
    const map = keyBy(this.props.groupsList, 'id');
    const { searchValue, displayIds } = this.state;
    return (
      <div className="ActivitiesApp__">
        <div className="ActivitiesApp__header">
          <h1 className="Heading Heading--medium">Find sports and societies</h1>
          <input
            className="HeaderSearch HeaderSearch--search-icon ActivitiesApp__search-input"
            type="search"
            placeholder="Search"
            value={searchValue}
            onChange={this.onSearchUpdate}
          />
          <div className="ActivitiesApp__filter-stat">
            Displaying {displayIds.length} sports & societies
          </div>
        </div>
        <div className="ActivitiesApp__main">
          <div className="ActivitiesApp__grid">
            <OrgansiationGrid organsiations={displayIds.map(id => map[id])} />
          </div>
        </div>
      </div>
    );
  }
}

StudentGroupsDiscovery.propTypes = {
  groupsList: PropTypes.arrayOf().isRequired,
};

// eslint-disable-next-line
class StudentGroupsDiscoveryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
    };
  }

  componentDidMount() {
    fetch(`${getFalmerEndpoint()}/graphql`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
query StudentGroups {
  allGroups {
    id
    name
    mslGroup {
      description
      link
      logoUrl
      logo {
        resource
      }
    }
  }
}
       `,
      }),
    })
      .then(data => data.json())
      .then(data =>
        this.setState({ isLoading: false, data: data.data.allGroups })
      );
  }

  render() {
    const { isLoading, data } = this.state;

    if (isLoading) {
      return <Loader dark />;
    }

    return (
      <StudentGroupsDiscovery
        {...this.props}
        isLoading={isLoading}
        groupsList={data}
      />
    );
  }
}

export default HydroLeaf()(StudentGroupsDiscoveryContainer);
