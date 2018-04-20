import React from 'react';
import bind from 'bind-decorator';
import { keyBy } from 'lodash';
import Fuse from 'fuse.js';
import HydroLeaf from '~components/HydroLeaf';
import OrgansiationGrid, { StudentGroup } from '~components/OrganisationGrid';
import STUDENT_GROUP_LISTING_QUERY from './StudentGroupListings.graphql';
import { Provider } from '../../types/hydro';
import { HandledQuery } from '~components/HandledQuery';

interface Result {
  allGroups: {
    edges: {
      node: StudentGroup;
    }[];
  };
}

interface IProps {
  data: Result;
}

interface IState {
  filter: null;
  searchValue: string;
  displayIds: number[];
  groups: StudentGroup[];
  fuse: Fuse | null;
}

class StudentGroupListingsQuery extends HandledQuery<Result, {}> {}

class StudentGroupsDiscovery extends React.Component<IProps, IState> {
  state: IState = {
    groups: [],
    filter: null,
    searchValue: '',
    displayIds: [],
    fuse: null,
  };

  static getDerivedStateFromProps(props: IProps) {
    const groups =
      props.data && props.data.allGroups
        ? props.data.allGroups.edges.map((edge) => edge.node)
        : [];

    return {
      groups,
      displayIds: groups.map((group) => group.groupId),
      fuse: new Fuse(groups, { keys: ['name'], id: 'groupId' }),
    };
  }

  @bind
  onSearchUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const fuse = this.state.fuse;
    if (fuse === null) {
      return;
    }

    const searchValue = e.target.value;
    this.setState({
      searchValue,
      displayIds: searchValue
        ? fuse.search(searchValue)
        : this.state.groups.map((group: StudentGroup) => group.groupId),
    });
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

function StudentGroupListings() {
  return (
    <StudentGroupListingsQuery query={STUDENT_GROUP_LISTING_QUERY}>
      {({ data }) => {
        if (!data) {
          return;
        }
        return <StudentGroupsDiscovery data={data} />;
      }}
    </StudentGroupListingsQuery>
  );
}

export default HydroLeaf({ providers: [Provider.Apollo] })(
  StudentGroupListings,
);
