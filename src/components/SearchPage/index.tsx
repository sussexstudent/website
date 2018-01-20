import React from 'react';
import qs from 'query-string';
import cx from 'classnames';
import { debounce, orderBy } from 'lodash';
import SearchResult, {
  SearchResult as ISearchResult,
} from '~components/SearchResult';
import SearchFilterNav from '~components/SearchFilterNav';
import getFalmerEndpoint from '~libs/getFalmerEndpoint';

import perf from '../../tracking/perf';

enum SearchAreas {
  Top = 'top',
  Groups = 'groups',
  News = 'news',
  Events = 'events',
  Pages = 'pages',
}

/* eslint-disable */

function getPayloadMetadata(payload: { [key: string]: Array<Object> }) {
  const areaTitlesMap: { [key: string]: string } = {
    [SearchAreas.Top]: 'Top results',
    [SearchAreas.Groups]: 'Sports & Societies',
    [SearchAreas.News]: 'News',
    [SearchAreas.Events]: 'Events',
    [SearchAreas.Pages]: 'Content',
  };

  const calcWeight = (area: SearchAreas) => {
    if (area === SearchAreas.Top) {
      return Infinity;
    }

    if (area === SearchAreas.News) {
      return -1;
    }
    const count = payload[area].length;
    if (count <= 0) {
      return -Infinity;
    } else {
      return count;
    }
  };

  const mk = (key: SearchAreas) => ({
    weight: calcWeight(key),
    count: payload[key].length,
    key,
    title: areaTitlesMap[key],
  });

  const orderedAreas = orderBy(
    [
      SearchAreas.Top,
      SearchAreas.Groups,
      SearchAreas.News,
      SearchAreas.Events,
      SearchAreas.Pages,
    ].map(mk),
    [(i) => i.weight, (i) => i.title],
    ['desc', 'asc'],
  );

  const hasResults =
    Object.keys(areaTitlesMap).reduce(
      (acc, key) => payload[key].length + acc,
      0,
    ) > 0;
  return {
    orderedAreas,
    hasResults,
  };
}

interface IProps {
  query: string;
}

interface IState {
  page: number;
  results: {
    [area: string]: Array<number>;
  } | null;
  resultItems: Array<ISearchResult>;
  isLoading: boolean;
  currentArea: SearchAreas;
  orderedAreas: Array<{
    weight: number;
    count: number;
    key: SearchAreas;
    title: string;
  }>; // todo
  hasResults: boolean;
}

class SearchPage extends React.Component<IProps, IState> {
  private loadQueryResultsDebounced: (query: string) => void;
  private searchContainerRef: HTMLDivElement | null;
  private containerRef: HTMLDivElement | null;

  constructor(props: IProps) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleNotFoundDesiredPage = this.handleNotFoundDesiredPage.bind(this);
    this.loadQueryResultsDebounced = debounce(
      this.loadQueryResults.bind(this),
      350,
    );

    this.state = {
      page: parseInt(qs.parse(location.search).page, 10) || 1,
      results: null,
      resultItems: [],
      isLoading: false,
      currentArea: SearchAreas.Top,
      hasResults: false,
      orderedAreas: [],
    };
  }

  componentWillMount() {
    if (this.props.query) {
      this.loadQueryResults(this.props.query);
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.query !== this.props.query) {
      this.handleUpdate(nextProps.query);
    }
  }

  onEmptyResults() {
    // eslint-disable-next-line no-undef
    ga('send', 'event', 'Search', 'emptyresults', this.props.query);
  }

  loadQueryResults(query: string) {
    // alleviate flash of loading when result is cached and gets returned quickly
    let didFinish = false;
    setTimeout(() => {
      if (!didFinish && this.props.query === query) {
        this.setState({ isLoading: true });
      }
    }, 60);

    // TODO: send after 1s. not here. causes half words in stats
    // send ga
    ga('set', 'page', `/search?q=${query}`);
    ga('send', 'pageview');

    const t = perf.recordTime('Search', 'fetchResults', { query });
    window
      .fetch(`${getFalmerEndpoint()}/search/?q=${query}`, {
        headers: {
          Accept: 'application/json, text/plain, */*',
        },
      })
      .then((res) => {
        t.done();
        return res.json();
      })
      .then((payload) => {
        if (query === this.props.query) {
          didFinish = true;
          const { orderedAreas, hasResults } = getPayloadMetadata(payload);
          this.setState({
            results: payload,
            resultItems: payload.results,
            orderedAreas,
            hasResults,
            currentArea: orderedAreas[0].key,
            isLoading: false,
          });
        }
      });
  }

  handleNotFoundDesiredPage() {
    // eslint-disable-next-line no-undef
    ga('send', 'event', 'Search', 'nothappy', this.props.query);
  }

  handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.setState({ page: 1 }, () => this.handleUpdate());
  }

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

  handlePageChange(nextNumber: number) {
    this.setState({ page: nextNumber }, () => this.handleUpdate());
    this.containerRef && this.containerRef.scrollIntoView(true);
  }

  handleMoveToContainerTop() {
    this.containerRef && this.containerRef.scrollIntoView(true);
  }

  handleAreaChange(area: SearchAreas) {
    this.setState({ currentArea: area });
  }

  renderMeta() {
    const { isLoading, hasResults, orderedAreas, currentArea } = this.state;
    let content;
    if (isLoading) {
      content = <span className="SearchMeta__note">Loading…</span>;
    } else if (hasResults === false) {
      return null;
    } else if (orderedAreas.length > 0) {
      content = (
        <SearchFilterNav
          value={currentArea}
          options={orderedAreas}
          onSelect={this.handleAreaChange}
        />
      );
    } else {
      content = <span className="SearchMeta__note">No results found.</span>;
    }

    return (
      <div className="SearchMeta">
        <div className="Container">{content}</div>
      </div>
    );
  }

  renderResults() {
    const { results, resultItems, isLoading, currentArea } = this.state;

    const containerclassNamees = cx('SearchApp__container', {
      'SearchApp__container--is-loading': isLoading === true,
    });

    return (
      <div className={containerclassNamees}>
        {this.renderMeta()}
        <div
          className="Container--for-search"
          ref={(ref) => (this.searchContainerRef = ref)}
        >
          <div className="Container">
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
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        ref={(ref) => {
          this.containerRef = ref;
        }}
      >
        {this.renderResults()}
      </div>
    );
  }
}

export default SearchPage;
