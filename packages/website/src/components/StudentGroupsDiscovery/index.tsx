import React, { useReducer, useCallback, useEffect } from 'react';
import { keyBy } from 'lodash';
import Fuse from 'fuse.js';
import OrganisationGrid from '../OrganisationGrid';
import STUDENT_GROUP_LISTING_QUERY from './StudentGroupListings.graphql';
import { StudentGroupsSectionbar } from '../StudentGroupsSectionbar';
import Helmet from 'react-helmet';
import { StudentGroup } from '@ussu/common/src/types/groups';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../Loader';

interface Result {
  allGroups: {
    edges: {
      node: StudentGroup;
    }[];
  };
}

interface State {
  filter: null;
  searchValue: string;
  displayIds: number[];
  groups: StudentGroup[];
  fuse: Fuse<any> | null;
}

interface SearchChangeAction {
  type: 'SEARCH_CHANGE';
  payload: {
    query: string;
  };
}

interface OnDataAction {
  type: 'ON_DATA';
  payload: {
    data: Result;
  };
}

type Actions = SearchChangeAction | OnDataAction;

const reducer: React.Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case 'SEARCH_CHANGE':
      const { query } = action.payload;
      return {
        ...state,
        searchValue: query,
        displayIds:
          query && state.fuse
            ? state.fuse.search(query)
            : state.groups.map((group: StudentGroup) => group.groupId),
      };

    case 'ON_DATA':
      const { data } = action.payload;
      const groups =
        data && data.allGroups
          ? data.allGroups.edges.map((edge) => edge.node)
          : [];

      return {
        ...state,
        groups,
        displayIds: groups.map((group) => group.groupId),
        fuse: new Fuse(groups, { keys: ['name'], id: 'groupId' }),
      };

    default:
      return state;
  }
};

export const StudentGroupListings: React.FC = () => {
  const { data, loading } = useQuery<Result>(STUDENT_GROUP_LISTING_QUERY);

  const [state, dispatch] = useReducer(reducer, {
    groups: [],
    filter: null,
    searchValue: '',
    displayIds: [],
    fuse: null,
  });

  const onSearchUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      dispatch({ type: 'SEARCH_CHANGE', payload: { query: searchValue } });
    },
    [],
  );

  useEffect(() => {
    data &&
      dispatch({
        type: 'ON_DATA',
        payload: {
          data,
        },
      });
  }, [data]);

  if (loading) return <Loader />;

  const map = keyBy(
    data && data.allGroups
      ? data.allGroups.edges.map((edge: { node: StudentGroup }) => edge.node)
      : [],
    (i) => i.groupId,
  );

  return (
    <div>
      <Helmet title="Discover student groups" />
      <StudentGroupsSectionbar />
      <div className="ActivitiesApp__ LokiContainer">
        <div className="ActivitiesApp__header">
          <h1 className="Heading Heading--medium">
            Discover sports and societies
          </h1>
          <input
            className="HeaderSearch HeaderSearch--search-icon ActivitiesApp__search-input"
            type="search"
            placeholder="Search"
            value={state.searchValue}
            onChange={onSearchUpdate}
          />
          <div className="ActivitiesApp__filter-stat">
            Displaying {state.displayIds.length} sports {'&'} societies
          </div>
        </div>
        <div className="ActivitiesApp__main">
          <div className="ActivitiesApp__grid">
            <OrganisationGrid
              organisations={state.displayIds.map((id) => map[id])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
