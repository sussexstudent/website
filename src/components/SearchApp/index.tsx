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
import * as routerActions from '../../projects/website/ducks/router';
import Helmet from 'react-helmet';
import { NoListItems } from '~website/containers/bookmarket/NoListItems';
import { Page } from '~website/containers/content/types';
import { Event } from '~types/events';
import { StudentGroup } from '~components/OrganisationGrid';
import { Location } from 'history';
import { RouteComponentProps } from 'react-router';
import { getFirstItemOrValue } from '~libs/qs';

interface Payload {
  data: {
    search: {
      top: string[];
      content: Page[];
      events: Event[];
      groups: StudentGroup[];
      news: any[];
      pages: any[];
    };
  };
}
enum GraphQLAreas {
  Content = 'content',
  Events = 'events',
  Groups = 'groups',
  News = 'news',
  Pages = 'pages',
  Top = 'top',
}

function generateKeyMap(search: Payload['data']['search']) {
  const m: { [key: string]: any } = {};

  Object.values(GraphQLAreas)
    .filter((a) => a !== GraphQLAreas.Top)
    .forEach((key: GraphQLAreas) => {
      (search[key] as any[]).forEach((item: any) => {
        m[`${item.__typename}_${item.id}`] = item;
      });
    });

  return m;
}

function getPayloadMetadata({ data: { search } }: Payload) {
  const payload = search;

  payload.events.map((event) => (event.id = event.eventId));
  payload.groups.map((group) => (group.id = group.groupId));
  payload.pages.map((page) => (page.id = page.uuid));
  payload.news.map((news) => (news.id = news.uuid));
  payload.groups.map((group) => (group.id = group.groupId));
  payload.content = payload.content.concat(payload.pages);

  const areaTitlesMap: { [key: string]: string } = {
    [GraphQLAreas.Top]: 'Top results',
    [GraphQLAreas.Groups]: 'Sports & Societies',
    [GraphQLAreas.News]: 'News',
    [GraphQLAreas.Events]: 'Events',
    [GraphQLAreas.Content]: 'Content',
    [GraphQLAreas.Pages]: 'Pages',
  };

  const calcWeight = (area: GraphQLAreas) => {
    if (area === GraphQLAreas.Top) {
      return Infinity;
    }

    if (area === GraphQLAreas.News) {
      return -1;
    }

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
      GraphQLAreas.Groups,
      GraphQLAreas.Events,
      GraphQLAreas.Content,
      GraphQLAreas.News,
      GraphQLAreas.Top,
    ].map(mk),
    [(i) => i.weight, (i) => i.title],
    ['desc', 'asc'],
  );

  const hasResults =
    Object.values(GraphQLAreas).reduce(
      (acc, key: GraphQLAreas) => payload[key].length + acc,
      0,
    ) > 0;

  const map = generateKeyMap(payload);

  return {
    payload,
    orderedAreas,
    hasResults,
    resultKeyMap: map,
    itemsByArea: {
      top: payload.top.map((key) => map[key]),
      events: payload.events,
      groups: payload.groups,
      content: payload.content,
      news: payload.news,
      pages: payload.pages,
    },
  };
}

interface IProps extends RouteComponentProps<{}> {
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
}

function getParams(location: Location): { area: GraphQLAreas } {
  const q = qs.parse(location.search);
  const area = getFirstItemOrValue(q.area);
  return {
    area: Object.values(GraphQLAreas).includes(area) ? area : GraphQLAreas.Top,
  };
}

class SearchApp extends React.Component<IProps, IState> {
  private loadQueryResultsDebounced: (query: string) => void;

  constructor(props: IProps) {
    super(props);

    this.loadQueryResultsDebounced = debounce(this.loadQueryResults, 350);

    this.state = {
      page:
        parseInt(getFirstItemOrValue(qs.parse(location.search).page), 10) || 1,
      results: null,
      resultItems: [],
      isLoading: false,
      hasResults: false,
      orderedAreas: [],
      itemsByArea: null,
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
                  id
                  title
                  path
                  searchDescription
                }
                events {
                  __typename
                  eventId
                  title
                  slug
                  shortDescription
                }
                groups {
                  __typename
                  groupId
                  name
                  description
                  link
                }
                pages {
                  __typename
                  uuid
                  link
                  title
                  description
                }
                news {
                  __typename
                  uuid
                  link
                  title
                  description
                }
                top
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
          const {
            orderedAreas,
            hasResults,
            resultKeyMap,
            itemsByArea,
          } = getPayloadMetadata(payload);
          this.setState({
            orderedAreas,
            itemsByArea,
            hasResults,
            results: resultKeyMap,
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
  handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.setSearchValue(e.currentTarget.value);
  }

  renderMeta() {
    const { area } = getParams(this.props.location);
    const { isLoading, hasResults, orderedAreas } = this.state;
    const { query } = this.props;
    let content;
    if (isLoading) {
      content = <span className="SearchMeta__note">Loading…</span>;
    } else if (hasResults === false) {
      content = null;
    } else if (orderedAreas.length > 0) {
      content = (
        <SearchFilterNav query={query} value={area} options={orderedAreas} />
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
    const { area } = getParams(this.props.location);
    const { itemsByArea, isLoading } = this.state;

    const containerclassNamees = cx('SearchApp__container', {
      'SearchApp__container--is-loading': isLoading === true,
    });

    return (
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
        {itemsByArea !== null && itemsByArea[area].length === 0 ? (
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

export default connect(
  (state: WebsiteRootState) => ({
    query: state.router.searchQuery,
  }),
  {
    setSearchValue: routerActions.setSearchValue,
  },
)(SearchApp) as any;
