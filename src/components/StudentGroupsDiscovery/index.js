import React from 'react';
import PropTypes from 'prop-types';
import keyBy from 'lodash/keyBy';
import Fuse from 'fuse.js';
import { forceCheck } from 'react-lazyload';
import HydroLeaf from '~components/HydroLeaf';
import OrgansiationGrid from '~components/OrgansiationGrid';
import { ApolloProvider, graphql } from 'react-apollo';
import getApolloClientForFalmer from '../../libs/getApolloClientForFalmer';
import StudentGroupListingsQuery from './StudentGroupListings.graphql';
import Loader from '../Loader/index';

class StudentGroupsDiscovery extends React.Component {
  constructor(props) {
    super(props);

    this.fuse = new Fuse(props.groupsList, { keys: ['name'], id: 'groupId' });

    this.state = {
      filter: null,
      searchValue: '',
      displayIds: props.groupsList.map(group => group.groupId),
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
          : this.props.groupsList.map(group => group.groupId),
      },
      () => {
        forceCheck();
      }
    );
  }

  render() {
    const map = keyBy(this.props.groupsList, 'groupId');
    const { searchValue, displayIds } = this.state;
    return (
      <div className="ActivitiesApp__">
        <div className="ActivitiesApp__header">
          <h1 className="Heading Heading--medium">
            Discover sports and societies
          </h1>
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

const StudentGroupListings = graphql(StudentGroupListingsQuery)(
  props =>
    props.data.loading ? (
      <Loader />
    ) : (
      <StudentGroupsDiscovery
        groupsList={props.data.allGroups.edges.map(edge => edge.node)}
      />
    )
);

const StudentGroupsApplication = () => (
  <ApolloProvider client={getApolloClientForFalmer}>
    <StudentGroupListings />
  </ApolloProvider>
);

export default HydroLeaf()(StudentGroupsApplication);
