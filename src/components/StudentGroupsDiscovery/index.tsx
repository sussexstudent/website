import React from 'react';
import { keyBy } from 'lodash';
import Fuse from 'fuse.js';
import { forceCheck } from 'react-lazyload';
import HydroLeaf from '~components/HydroLeaf';
import OrgansiationGrid, { StudentGroup } from '~components/OrganisationGrid';
import { graphql, ChildProps } from 'react-apollo';
import StudentGroupListingsQuery from './StudentGroupListings.graphql';
import { compose } from 'recompose';
import apolloHandler from '~components/apolloHandler';

interface OwnProps {
  groupsList: Array<StudentGroup>;
}

interface Result {
  allGroups: {
    edges: Array<{
      node: StudentGroup;
    }>;
  };
}

interface IState {
  filter: null;
  searchValue: string;
  displayIds: Array<number>;
  groups: Array<StudentGroup>;
}

type IProps = OwnProps & ChildProps<OwnProps, Result>;

class StudentGroupsDiscovery extends React.Component<IProps, IState> {
  private fuse: Fuse;
  constructor(props: IProps) {
    super(props);

    const groups =
      props.data && props.data.allGroups
        ? props.data.allGroups.edges.map((edge) => edge.node)
        : [];

    this.fuse = new Fuse(groups, { keys: ['name'], id: 'groupId' });

    this.state = {
      filter: null,
      searchValue: '',
      displayIds: groups.map((group) => group.groupId),
      groups,
    };

    this.onSearchUpdate = this.onSearchUpdate.bind(this);
  }

  onSearchUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    this.setState(
      {
        searchValue,
        displayIds: searchValue
          ? this.fuse.search(searchValue)
          : this.state.groups.map((group) => group.groupId),
      },
      () => {
        forceCheck();
      },
    );
  }

  render() {
    const map = keyBy(
      this.props.data && this.props.data.allGroups
        ? this.props.data.allGroups.edges.map(
            (edge: { node: StudentGroup }) => edge.node,
          )
        : [],
      (i) => i.groupId,
    );
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
            Displaying {displayIds.length} sports {'&'} societies
          </div>
        </div>
        <div className="ActivitiesApp__main">
          <div className="ActivitiesApp__grid">
            <OrgansiationGrid organisations={displayIds.map((id) => map[id])} />
          </div>
        </div>
      </div>
    );
  }
}

const StudentGroupListings = compose<OwnProps, {}>(
  graphql<Result>(StudentGroupListingsQuery),
  apolloHandler(),
)(StudentGroupsDiscovery);

export default HydroLeaf()(StudentGroupListings);
