import React from 'react';
import qs from 'query-string';
import { Sectionbar } from '~components/Sectionbar';
import bind from 'bind-decorator';
import cx from 'classnames';
import { debounce, orderBy } from 'lodash';
import SearchResult, {
  SearchResult as ISearchResult,
} from '~components/SearchResult';
import SearchFilterNav from '~components/SearchFilterNav';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';
import perf from '../../tracking/perf';
import { WebsiteRootState } from '~types/website';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as routerActions from '../../projects/website/ducks/router';
import Helmet from 'react-helmet';
import { NoListItems } from '~website/containers/bookmarket/NoListItems';
import { Page } from '~website/containers/content/types';
import { Event } from '~types/events';
import { StudentGroup } from '~components/OrganisationGrid';

enum SearchAreas {
  Top = 'top',
  Groups = 'groups',
  News = 'news',
  Events = 'events',
  Pages = 'pages',
  Content = 'content',
}

interface Payload {
  data: {
    search: {
      combined: string[];
      content: Page[];
      events: Event[];
      groups: StudentGroup[];
    };
  };
}
enum GraphQLAreas {
  Content = 'content',
  Events = 'events',
  Groups = 'groups',
}

function generateKeyMap(search: Payload['data']['search']) {
  const m: { [key: string]: any } = {};

  Object.values(GraphQLAreas).forEach((key: GraphQLAreas) => {
    (search[key] as any[]).forEach((item: any) => {
      m[`${item.__typename}_${item.id}`] = item;
    });
  });

  return m;
}

function getPayloadMetadata({ data: { search } }: Payload) {
  const payload = search;
  const areaTitlesMap: { [key: string]: string } = {
    [SearchAreas.Top]: 'Top results',
    [SearchAreas.Groups]: 'Sports & Societies',
    [SearchAreas.News]: 'News',
    [SearchAreas.Events]: 'Events',
    [SearchAreas.Content]: 'Content',
  };

  const calcWeight = (area: GraphQLAreas) => {
    // if (area === SearchAreas.Top) {
    //   return Infinity;
    // }

    // if (area === SearchAreas.News) {
    //   return -1;
    // }

    const count = payload[area].length;
    if (count <= 0) {
      return -Infinity;
    }

    return count;
  };

  const mk = (key: GraphQLAreas) => ({
    key,
    weight: calcWeight(key),
    count: payload[key].length,
    title: areaTitlesMap[key],
  });

  const orderedAreas = orderBy(
    [
      // SearchAreas.Top,
      GraphQLAreas.Groups,
      // SearchAreas.News,
      GraphQLAreas.Events,
      GraphQLAreas.Content,
      // SearchAreas.Pages,
    ].map(mk),
    [(i) => i.weight, (i) => i.title],
    ['desc', 'asc'],
  );

  const hasResults =
    Object.values(GraphQLAreas).reduce(
      (acc, key: GraphQLAreas) => payload[key].length + acc,
      0,
    ) > 0;
  return {
    orderedAreas,
    hasResults,
    resultKeyMap: generateKeyMap(payload),
  };
}

interface IProps {
  query: string;
  setSearchValue: typeof routerActions.setSearchValue;
}

interface IState {
  page: number;
  results: {
    [area: string]: number[];
  } | null;
  resultItems: ISearchResult[];
  isLoading: boolean;
  currentArea: GraphQLAreas;
  orderedAreas: {
    weight: number;
    count: number;
    key: GraphQLAreas;
    title: string;
  }[]; // todo
  hasResults: boolean;
}

class SearchApp extends React.Component<IProps, IState> {
  private loadQueryResultsDebounced: (query: string) => void;

  constructor(props: IProps) {
    super(props);

    this.loadQueryResultsDebounced = debounce(this.loadQueryResults, 350);

    this.state = {
      page: parseInt(qs.parse(location.search).page, 10) || 1,
      results: null,
      resultItems: [],
      isLoading: false,
      currentArea: GraphQLAreas.Content,
      hasResults: false,
      orderedAreas: [],
    };
  }
  UNSAFE_componentWillMount() {
    const query = this.props.query;
    if (query) {
      this.loadQueryResults(query);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    const query = this.props.query;
    const queryNext = nextProps.query;

    if (queryNext !== query) {
      this.handleUpdate(queryNext);
    }
  }

  @bind
  loadQueryResults(query: string) {
    // alleviate flash of loading when result is cached and gets returned quickly
    let didFinish = false;
    setTimeout(() => {
      if (!didFinish && query === query) {
        // === current query
        this.setState({ isLoading: true });
      }
    }, 60);

    const t = perf.recordTime('Search', 'fetchResults', { query });
    window
      .fetch(`${getFalmerEndpoint()}/graphql/`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query Search($query: String) {
              search(query: $query) {
                content {
                  __typename
                  pageId
                  title
                  searchDescription
                }
                events {
                  __typename
                  id
                  title
                  shortDescription
                }
                groups {
                  __typename
                  id
                  name
                  description
                }
                combined
              }
            }
          `,
          variables: {
            query,
          },
        }),
      })
      .then((res) => {
        t.done();
        return res.json();
      })
      .then((payload) => {
        if (query === query) {
          // === current query
          didFinish = true;
          const { orderedAreas, hasResults, resultKeyMap } = getPayloadMetadata(
            payload,
          );
          this.setState({
            orderedAreas,
            hasResults,
            results: resultKeyMap,
            resultItems: payload.data.search.combined,
            currentArea: orderedAreas[0].key,
            isLoading: false,
          });
        }
      });
  }

  @bind
  handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.setState({ page: 1 }, () => this.handleUpdate());
  }

  @bind
  handleUpdate(forceSearchTerm: string | null = null) {
    const query = forceSearchTerm === null ? this.props.query : forceSearchTerm;

    if (query !== '') {
      this.loadQueryResultsDebounced(query);
    } else {
      this.setState((state) => ({
        ...state,
        results: null,
        isLoading: false,
        orderedAreas: [],
        hasResults: false,
      }));
    }
  }

  @bind
  handlePageChange(nextNumber: number) {
    this.setState({ page: nextNumber }, () => this.handleUpdate());
  }

  @bind
  handleAreaChange(area: GraphQLAreas) {
    this.setState({ currentArea: area });
  }

  @bind
  handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.setSearchValue(e.currentTarget.value);
  }

  renderMeta() {
    const { isLoading, hasResults, orderedAreas, currentArea } = this.state;
    const { query } = this.props;
    let content;
    if (isLoading) {
      content = <span className="SearchMeta__note">Loading…</span>;
    } else if (hasResults === false) {
      content = null;
    } else if (orderedAreas.length > 0) {
      content = (
        <SearchFilterNav
          query={query}
          value={currentArea}
          options={orderedAreas}
          onSelect={this.handleAreaChange}
        />
      );
    } else {
      content = <span className="SearchMeta__note">No results found.</span>;
    }

    return (
      <React.Fragment>
        <input
          className="SearchApp__mobile-search-input"
          type="search"
          value={this.props.query}
          onChange={this.handleSearchInput}
          placeholder="Search"
          autoFocus
        />
        {content}
      </React.Fragment>
    );
  }

  renderResults() {
    const { results, resultItems, isLoading, currentArea } = this.state;

    const containerclassNamees = cx('SearchApp__container', {
      'SearchApp__container--is-loading': isLoading === true,
    });

    console.log({ results, resultItems });
    return (
      <div className={containerclassNamees}>
        {results !== null && results[currentArea].length > 0 ? (
          <ul
            className={cx('ResultsList', {
              'ResultsList--stale': isLoading,
            })}
          >
            {results[currentArea].map((item) => (
              <SearchResult key={item} item={resultItems[item]} />
            ))}
          </ul>
        ) : null}
        {results !== null && results[currentArea].length === 0 ? (
          <NoListItems />
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet
          title={
            this.props.query ? `Search for "${this.props.query}"` : 'Search'
          }
        />
        <Sectionbar title="Search">{this.renderMeta()}</Sectionbar>
        <div className="LokiContainer">{this.renderResults()}</div>
      </div>
    );
  }
}

export default compose<IProps, {}>(
  connect(
    (state: WebsiteRootState) => ({
      query: state.router.searchQuery,
    }),
    {
      setSearchValue: routerActions.setSearchValue,
    },
  ),
)(SearchApp as any);
