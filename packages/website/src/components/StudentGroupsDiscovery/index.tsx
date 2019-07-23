import React, { useReducer, useCallback, useEffect } from 'react';
import { keyBy } from 'lodash';
import Fuse from 'fuse.js';
import OrganisationGrid from '../OrganisationGrid';
import STUDENT_GROUP_LISTING_QUERY from './StudentGroupListings.graphql';
import { StudentGroupsSectionbar } from '../StudentGroupsSectionbar';
import Helmet from 'react-helmet';
import { StudentGroup } from '@ussu/common/src/types/groups';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Loader';
import css from '@emotion/css';
import { COLORS } from '@ussu/common/src/libs/style';
import CrossIcon from '../CrossIcon';
import { cx } from 'emotion';

interface Result {
  allGroups: {
    edges: {
      node: StudentGroup;
    }[];
  };
}

interface State {
  filter: string;
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

interface CategoryFilterAction {
  type: 'CATEGORY_FILTER';
  payload: {
    category: string;
  };
}

type Actions = SearchChangeAction | OnDataAction | CategoryFilterAction;

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

    case 'CATEGORY_FILTER':
      const { category } = action.payload;
      return {
        ...state,
        filter: category,
        displayIds: category
          ? state.groups
              .filter(
                (group) =>
                  group.mslGroup && group.mslGroup.category.name === category,
              )
              .map((group: StudentGroup) => group.groupId)
          : state.groups.map((group: StudentGroup) => group.groupId),
      };

    default:
      return state;
  }
};

const resetButton = css({
  backgroundColor: COLORS.BRAND_RED,
  color: COLORS.WHITE,
  opacity: 1,
  marginTop: '0.5em',
  '&[disabled]': {
    opacity: 0.5,
  },
});

export const StudentGroupListings: React.FC = () => {
  const { data, loading } = useQuery<Result>(STUDENT_GROUP_LISTING_QUERY);

  const [state, dispatch] = useReducer(reducer, {
    groups: [],
    filter: '',
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

  function onFilter(category: string | null) {
    return function() {
      dispatch({
        type: 'CATEGORY_FILTER',
        payload: { category: category || '' },
      });
    };
  }

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

  const categories = (): Array<string | null> => {
    const categoryNames =
      data && data.allGroups
        ? data.allGroups.edges.map((edge: { node: StudentGroup }) =>
            edge.node.mslGroup ? edge.node.mslGroup.category.name : null,
          )
        : [];
    const categoryArray = Array.from(new Set(categoryNames));
    return categoryArray;
  };

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
          {categories() ? (
            <div>
              <h3 className="type-pica" style={{ textAlign: 'center' }}>
                Discover by category
              </h3>
              <ul className="BrickWall List--reset">
                {categories().map(function(cat, i) {
                  return (
                    <li className="BrickWall__item" key={i}>
                      <button
                        className={cx('BrickWall__anchor', {
                          'BrickWall__anchor--dim':
                            state.filter !== '' && cat !== state.filter,
                        })}
                        onClick={onFilter(cat)}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                className="Button Button--color-red reset-button"
                css={resetButton}
                disabled={state.filter === ''}
                onClick={onFilter('')}
              >
                Clear filters <CrossIcon height="13" verticalAlign="middle" />
              </button>
            </div>
          ) : null}
          <div>
            <h2>Can't find what you're looking for?</h2>
            <a
              className="Button Button--color-green"
              href="/sport-societies-media/start-a-new-group/"
            >
              Start a new group &raquo;
            </a>
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
