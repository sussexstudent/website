import React from 'react';
import qs from 'query-string';
import cx from 'classnames';
import debounce from 'lodash/debounce';

import perf from '../../tracking/perf';
import SearchResult from '../../components/SearchResult';
import FeedbackButton from '../../components/FeedbackButton';
import PaginationNavigation from '../../components/PaginationNavigation';

/* eslint-disable */

const SEARCH_AREAS = {
  EVERYTHING: 'a',
  SOCSPORT: 's',
  EVENTS: 'e',
};

const fields = 'items(cacheId,image,kind,labels,link,mime,pagemap,snippet,title),spelling,url,searchInformation';

class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAreaUpdate = this.handleAreaUpdate.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleNotFoundDesiredPage = this.handleNotFoundDesiredPage.bind(this);
    this.loadQueryResultsDebounced = debounce(this.loadQueryResults.bind(this), 350);

    this.state = {
      // query: qs.parse(location.search).q || '',
      page: parseInt(qs.parse(location.search).page, 10) || 1,
      searchArea: SEARCH_AREAS.EVERYTHING,
      results: null,
      isLoading: null,
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
    this.setState({ isLoading: true })

    ga('set', 'page', `/search?q=${query}`);
    ga('send', 'pageview');

    const t = perf.recordTime('Search', 'fetchResults', { query });
    window
      .fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&num=10&start=${((page - 1) * 10) + 1}&cx=012345016055136658152%3Aaszn2y43suc&key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&fields=${fields}`)
      .then((res) => { t.done(); return res.json() })
      .then(payload => {
        if (query === this.props.query) {
          this.setState({ results: payload, isLoading: false })
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
      this.setState({ results: null, isLoading: false });
    }

    const search = qs.parse(location.search);
    search.q = query;
    search.page = this.props.page;
  }

  handleAreaUpdate(e) {
    this.setState({ searchArea: e.target.value });
  }

  handlePageChange(nextNumber) {
    this.setState({ page: nextNumber }, () => this.handleUpdate());
    this.containerRef.scrollIntoView(true);
  }

  handleMoveToContainerTop() {
    this.containerRef.scrollIntoView(true);
  }

  renderResults() {
    const { query } = this.props;
    const { results, isLoading, searchArea, page } = this.state;

    const containerclassNamees = cx('SearchApp__container', { 'SearchApp__container--is-loading':  isLoading === true });
    const loadingElement = (
      <div className={cx('SearchApp__result-message', { 'SearchApp__result-message--is-visible':  isLoading })}>
        Loading…
      </div>
    );

    if (!results) {
      return (
        <div className={containerclassNamees}>
          {loadingElement}
        </div>
      );
    }

    const { items} = results;


    return (
      <div className={containerclassNamees}>
        {loadingElement}
        <ul className="ResultsList">
          {items && items.map(item => ((
            <SearchResult key={item.cacheId} item={item} />
          )))}
          {!items && query !== '' ? (<li>No results found.</li>) : null}
        </ul>
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
      </div>
    );
  }

  render() {
    const { query } = this.props;
    const { searchArea } = this.state;

    return (
      <div ref={(ref) => { this.containerRef = ref; }}>
        {this.renderResults()}
      </div>
    );
  }
}

export default SearchPage;

/*            <span className={styles.for}>for</span>
            <fieldset className={styles.fieldset}>
              <label className={styles.radioItem} htmlFor="everythingOption">
                <input className={styles.radioInput} onChange={this.handleAreaUpdate} type="radio" id="everythingOption" name="searchArea" value={SEARCH_AREAS.EVERYTHING} checked={searchArea == SEARCH_AREAS.EVERYTHING} />
                everything
              </label>

              <label className={styles.radioItem} htmlFor="socsportsOption">
                <input className={styles.radioInput} onChange={this.handleAreaUpdate} type="radio" id="socsportsOption" name="searchArea" value={SEARCH_AREAS.SOCSPORT} checked={searchArea == SEARCH_AREAS.SOCSPORT} />
                societies & sports
              </label>
              <label className={styles.radioItem} htmlFor="eventsOption">
                <input className={styles.radioInput} onChange={this.handleAreaUpdate} type="radio" id="eventsOption" name="searchArea" value={SEARCH_AREAS.EVENTS} checked={searchArea == SEARCH_AREAS.EVENTS} />
                events
              </label>
            </fieldset>
*/
