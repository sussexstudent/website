import React, { useCallback, useReducer, useEffect } from 'react';
import qs from 'query-string';
import { Sectionbar } from '../Sectionbar';
import cx from 'classnames';
import SearchResult, { SearchResult as ISearchResult } from '../SearchResult';
import SearchFilterNav from '../SearchFilterNav';
import * as routerActions from '../../ducks/router';
import Helmet from 'react-helmet';
import { NoListItems } from '../../pages/bookmarket/NoListItems';
import { Location } from 'history';
import { RouteComponentProps } from 'react-router';
import { getFirstItemOrValue } from '@ussu/common/src/libs/qs';
import { WebsiteRootState } from '../../types/website';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { useThrottle } from '../../hooks/useThrottle';
import {
  getPayloadMetadata,
  GraphQLAreas,
  querySearch,
  SearchPayload,
} from './utils';

export interface SearchProps extends RouteComponentProps<{}> {
  query: string;
  setSearchValue: typeof routerActions.setSearchValue;
}

interface SearchState {
  page: number;
  results: {
    [area: string]: number[];
  } | null;
  resultItems: ISearchResult[];
  isLoading: boolean;
  orderedAreas: {
    weight: number;
    count: number;
    key: GraphQLAreas;
    title: string;
  }[]; // todo
  hasResults: boolean;
  itemsByArea: null | {
    [GraphQLAreas.Top]: any[];
    [GraphQLAreas.Content]: any[];
    [GraphQLAreas.Groups]: any[];
    [GraphQLAreas.News]: any[];
    [GraphQLAreas.Pages]: any[];
    [GraphQLAreas.Events]: any[];
  };
  latestQuery: string;
}

interface EmptyQueryAction {
  type: 'EMPTY_QUERY';
}

interface QueryResultAction {
  type: 'QUERY_RESULT';
  payload: {
    data: SearchPayload;
    query: string;
  };
}
interface LatestQueryAction {
  type: 'LATEST_QUERY';
  payload: {
    query: string;
  };
}

type ActionTypes = EmptyQueryAction | QueryResultAction | LatestQueryAction;

const reducer: React.Reducer<SearchState, ActionTypes> = (state, action) => {
  switch (action.type) {
    case 'EMPTY_QUERY':
      return {
        ...state,
        results: null,
        isLoading: false,
        orderedAreas: [],
        hasResults: false,
      };
    case 'QUERY_RESULT':
      if (action.payload.query !== state.latestQuery) return state;

      const {
        orderedAreas,
        hasResults,
        resultKeyMap,
        itemsByArea,
      } = getPayloadMetadata(action.payload.data);

      return {
        ...state,
        orderedAreas,
        itemsByArea,
        hasResults,
        results: resultKeyMap,
        searchMap: false,
        isLoading: false,
      };
    case 'LATEST_QUERY': {
      return {
        ...state,
        latestQuery: action.payload.query,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};

function getParams(location: Location): { area: GraphQLAreas } {
  const q = qs.parse(location.search);
  const area = getFirstItemOrValue(q.area);
  return {
    area: Object.values(GraphQLAreas).includes(area) ? area : GraphQLAreas.Top,
  };
}

export const Search: React.FC<SearchProps> = ({ location }) => {
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      query: state.router.searchQuery,
    }),
    [],
  );

  const { query } = useMappedState(mapState);
  const dispatch = useDispatch();

  const [state, dispatchState] = useReducer(reducer, {
    page:
      parseInt(getFirstItemOrValue(qs.parse(location.search).page), 10) || 1,
    results: null,
    resultItems: [],
    isLoading: false,
    hasResults: false,
    orderedAreas: [],
    itemsByArea: null,
    latestQuery: '',
  });

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(routerActions.setSearchValue(e.currentTarget.value));
    },
    [dispatch],
  );

  const load = useCallback((givenQuery: string) => {
    dispatchState({ type: 'LATEST_QUERY', payload: { query: givenQuery } });
    querySearch(givenQuery).then((payload) => {
      dispatchState({
        type: 'QUERY_RESULT',
        payload: {
          data: payload,
          query: givenQuery,
        },
      });
    });
  }, []);

  const loadQueryResults = useThrottle(load, 800);

  useEffect(
    (forceSearchTerm: string | null = null) => {
      const selectedQuery = forceSearchTerm === null ? query : forceSearchTerm;

      if (query !== '') {
        loadQueryResults(selectedQuery);
      } else {
        dispatchState({ type: 'EMPTY_QUERY' });
      }
    },
    [query],
  );

  const { area } = getParams(location);
  const {
    itemsByArea,
    isLoading,
    hasResults,
    orderedAreas,
    latestQuery,
  } = state;

  const containerclassNamees = cx('SearchApp__container', {
    'SearchApp__container--is-loading': isLoading === true,
  });

  let metaContent;
  if (isLoading) {
    metaContent = <span className="SearchMeta__note">Loading…</span>;
  } else if (hasResults === false) {
    metaContent = null;
  } else if (orderedAreas.length > 0) {
    metaContent = (
      <SearchFilterNav query={query} value={area} options={orderedAreas} />
    );
  } else {
    metaContent = <span className="SearchMeta__note">No results found.</span>;
  }

  return (
    <div>
      <Helmet title={query ? `Search for "${query}"` : 'Search'} />
      <Sectionbar title="Search">
        <input
          className="SearchApp__mobile-search-input"
          type="search"
          value={query}
          onChange={handleSearchInput}
          placeholder="Search"
          autoFocus
        />
        {metaContent}
      </Sectionbar>
      <div className="LokiContainer">
        <div className={containerclassNamees}>
          {itemsByArea !== null && itemsByArea[area].length > 0 ? (
            <ul
              className={cx('ResultsList', {
                'ResultsList--stale': isLoading,
              })}
            >
              {itemsByArea[area].map((item) => (
                <SearchResult
                  key={`${item.__typename}_${item.id}`}
                  type={item.__typename}
                  item={item}
                />
              ))}
            </ul>
          ) : null}
          {!isLoading &&
          query === latestQuery &&
          itemsByArea !== null &&
          itemsByArea[area].length === 0 ? (
            <NoListItems />
          ) : null}
        </div>
      </div>
    </div>
  );
};
