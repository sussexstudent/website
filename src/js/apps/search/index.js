import React from 'react';
import qs from 'query-string';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import orderBy from 'lodash/orderBy';

import perf from '../../tracking/perf';
import SearchResult from '../../components/SearchResult';
import SearchFilterNav from '../../components/SearchFilterNav';

/* eslint-disable */

function getPayloadMetadata(payload) {
  const areas = {
    groups: 'Sports & Societies',
    news: 'News',
    events: 'Events',
    pages: 'Content',
  };

  const calcWeight = key => {
    if (key === 'news') {
      return -1;
    }
    const count = payload[key].length;
    if (count <= 0) {
      return -Infinity;
    } else {
      return count;
    }
  };

  const mk = key => ({
    weight: calcWeight(key),
    count: payload[key].length,
    key,
    title: areas[key],
  });

  const orderedAreas = orderBy(
    ['groups', 'events', 'pages', 'news'].map(mk),
    ['weight', 'name'],
    ['desc', 'asc']
  );

  const hasResults =
    Object.keys(areas).reduce((acc, key) => payload[key].length + acc, 0) > 0;
  return {
    orderedAreas,
    hasResults,
  };
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleNotFoundDesiredPage = this.handleNotFoundDesiredPage.bind(this);
    this.loadQueryResultsDebounced = debounce(
      this.loadQueryResults.bind(this),
      350
    );

    this.state = {
      // query: qs.parse(location.search).q || '',
      page: parseInt(qs.parse(location.search).page, 10) || 1,
      results: null,
      isLoading: false,
      currentArea: null,
    };
  }

  componentWillMount() {
    if (this.props.query) {
      this.loadQueryResults();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.handleUpdate(nextProps.query);
    }
  }

  onEmptyResults() {
    // eslint-disable-next-line no-undef
    ga('send', 'event', 'Search', 'emptyresults', this.props.query);
  }

  loadQueryResults(query) {
    const { page } = this.state;

    // alleviate flash of loading when result is cached and gets returned quickly
    let didFinish = false;
    setTimeout(() => {
      if (!didFinish) {
        this.setState({ isLoading: true });
      }
    }, 60);

    // TODO: send after 1s. not here. causes half words in stats
    // send ga
    ga('set', 'page', `/search?q=${query}`);
    ga('send', 'pageview');

    const t = perf.recordTime('Search', 'fetchResults', { query });
    window
      .fetch(`https://dgv7dbrr4a1ou.cloudfront.net/search/${query}`)
      .then(res => {
        t.done();
        return res.json();
      })
      .then(payload => {
        if (query === this.props.query) {
          didFinish = true;
          const { orderedAreas, hasResults } = getPayloadMetadata(payload);
          this.setState({
            results: payload,
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

  handleSearch(e) {
    e.preventDefault();
    this.setState({ page: 1 }, () => this.handleUpdate());
  }

  handleUpdate(forceSearchTerm = null) {
    const query = forceSearchTerm === null ? this.props.query : forceSearchTerm;

    if (query !== '') {
      this.loadQueryResultsDebounced(query);
    } else {
      this.setState({
        results: null,
        isLoading: false,
        hasResults: null,
        orderedAreas: null,
      });
    }

    const search = qs.parse(location.search);
    search.q = query;
    search.page = this.props.page;
  }

  handlePageChange(nextNumber) {
    this.setState({ page: nextNumber }, () => this.handleUpdate());
    this.containerRef.scrollIntoView(true);
  }

  handleMoveToContainerTop() {
    this.containerRef.scrollIntoView(true);
  }

  handleAreaChange(area) {
    this.setState({ currentArea: area });
  }

  renderMeta() {
    const {
      results,
      isLoading,
      hasResults,
      searchArea,
      page,
      orderedAreas,
      currentArea,
    } = this.state;
    let content;
    if (isLoading) {
      content = <span className="SearchMeta__note">Loading…</span>;
    } else if (hasResults === false) {
      content = <span className="SearchMeta__note">No results found.</span>;
    } else if (orderedAreas) {
      content = (
        <SearchFilterNav
          value={currentArea}
          options={orderedAreas}
          onSelect={this.handleAreaChange}
        />
      );
    } else {
      return null;
    }

    return (
      <div className="SearchMeta">
        <div className="Container">
          {content}
        </div>
      </div>
    );
  }

  renderResults() {
    const { query } = this.props;
    const { results, isLoading, searchArea, page, currentArea } = this.state;

    const containerclassNamees = cx('SearchApp__container', {
      'SearchApp__container--is-loading': isLoading === true,
    });

    return (
      <div className={containerclassNamees}>
        {this.renderMeta()}
        <div
          className="Container--for-search"
          ref={ref => (this.searchContainerRef = ref)}
        >
          <div className="Container">
            {results !== null && results[currentArea].length > 0
              ? <ul
                  className={cx('ResultsList', {
                    'ResultsList--stale': isLoading,
                  })}
                >
                  {results[currentArea].map(item => (
                    <SearchResult key={item.link} item={item} />
                  ))}
                </ul>
              : null}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { query } = this.props;
    const { searchArea } = this.state;

    return (
      <div
        ref={ref => {
          this.containerRef = ref;
        }}
      >
        {this.renderResults()}
      </div>
    );
  }
}

export default SearchPage;

/*

import FeedbackButton from '../../components/FeedbackButton';
import PaginationNavigation from '../../components/PaginationNavigation';


            <span className={styles.for}>for</span>
            <fieldset className={styles.fieldset}>
              <label className={styles.radioItem} htmlFor="everythingOption">
                <input
                  className={styles.radioInput}
                  onChange={this.handleAreaUpdate}
                  type="radio"
                  id="everythingOption"
                  name="searchArea"
                  value={SEARCH_AREAS.EVERYTHING}
                  checked={searchArea == SEARCH_AREAS.EVERYTHING}
                />
                everything
              </label>

              <label className={styles.radioItem} htmlFor="socsportsOption">
                <input className={styles.radioInput} onChange={this.handleAreaUpdate} type="radio" id="socsportsOption"
                name="searchArea" value={SEARCH_AREAS.SOCSPORT} checked={searchArea == SEARCH_AREAS.SOCSPORT} />
                societies & sports
              </label>
              <label className={styles.radioItem} htmlFor="eventsOption">
                <input className={styles.radioInput} onChange={this.handleAreaUpdate} type="radio" id="eventsOption"
                name="searchArea" value={SEARCH_AREAS.EVENTS} checked={searchArea == SEARCH_AREAS.EVENTS} />
                events
              </label>
            </fieldset>
*/

/*

        {items && <PaginationNavigation
          currentPage={page}
          totalPages={Math.ceil(results.searchInformation.totalResults / 10)}
          onPageChange={this.handlePageChange}
        />}
        { true ? null : <FeedbackButton
          buttonText="Haven't found what you were looking for?"
          givenText="Sorry you couldn't find what you were looking for. Thank you for the feedback, we are alway wanting to improve our site."
          feedbackKey={`${query}:${searchArea}`}
          onFeedback={this.handleNotFoundDesiredPage}
        /> }
*/
