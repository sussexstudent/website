import React from 'react';
import each from 'lodash/each';
import Tweet from './Tweet';
import Loader from '../Loader';
import perf from '../../tracking/perf';

const ATTACHMENT_TWEET_HEIGHT = 375;
const TWEET_HEIGHT = 175;
const MIN_TWEET_COUNT = 3;
const TWITTER_CACHE_RESOURCE = 'https://dxziiu0wrgyxg.cloudfront.net/tweets';

class TweetList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: null,
      isLoading: true,
      tweets: null,
    };
  }

  componentDidMount() {
    if (this.listEL) {
      const { height } = this.listEL.getBoundingClientRect();
      // eslint-disable-next-line
      this.setState({ height });
    }
    const t = perf.recordTime(`TweetList: ${this.props.query}`, 'fetch');

    fetch(`${TWITTER_CACHE_RESOURCE}?q=${this.props.query}&s=${this.props.signature}`)
      .then((response) => { t.done(); return response.json(); })
      .then(data => this.setState({ tweets: data, isLoading: false }))
      .catch(e => this.setState({ tweets: e }));
  }

  getTweetQuantityForHeight() {
    let count = 0;
    let currentHeight = 0;
    // eslint-disable-next-line
    each(this.state.tweets, (tweet) => {
      if (currentHeight > this.state.height) {
        count -= 1;
        return false;
      }

      count += 1;
      if (tweet.quoted_status || (tweet.entities.media && tweet.entities.media.length > 0)) {
        currentHeight += ATTACHMENT_TWEET_HEIGHT;
      } else {
        currentHeight += TWEET_HEIGHT;
      }
    });
    return count > MIN_TWEET_COUNT ? count : MIN_TWEET_COUNT;
  }

  render() {
    const { tweets, isLoading } = this.state;
    if (isLoading) {
      return (
        <ul className="TweetList" ref={(ref) => { this.listEL = ref; }}>
          <Loader />
        </ul>
      );
    }

    if (!isLoading && !tweets) {
      return (
        <ul className="TweetList">
          <p>{'Something went wong, we\'re unable to load the latest tweets'}</p>
        </ul>
      );
    }

    return (
      <ul className="TweetList">
        {tweets.slice(0, this.getTweetQuantityForHeight()).map(tweet => <Tweet data={tweet} key={tweet.id_str} />)}
        <a className="TweetList__view-more" href="https://twitter.com/USSU/lists/ussu">View on Twitter</a>
      </ul>
    );
  }
}

TweetList.propTypes = {
  query: React.PropTypes.string.isRequired,
  signature: React.PropTypes.string.isRequired,
};

export default TweetList;
