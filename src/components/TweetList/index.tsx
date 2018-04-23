import React from 'react';
import { each } from 'lodash';
import Loader from '~components/Loader';
import HydroLeaf from '~components/HydroLeaf';
import Tweet from './Tweet';
import FitOverflowChildren from '../FitOverflowChildren';
import perf from '../../tracking/perf';
import { TweetData } from '~components/TweetList/types';

const ATTACHMENT_TWEET_HEIGHT = 375;
const TWEET_HEIGHT = 175;
const MIN_TWEET_COUNT = 3;
const TWITTER_CACHE_RESOURCE = 'https://dxziiu0wrgyxg.cloudfront.net/tweets';

interface IProps {
  query: string;
  signature: string;
}

interface IState {
  height: null | number;
  isLoading: boolean;
  tweets: any; // todo
}

class TweetList extends React.Component<IProps, IState> {
  private listEL: any;

  constructor(props: IProps) {
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
      this.setState({ height });
    }
    const t = perf.recordTime(`TweetList: ${this.props.query}`, 'fetch');

    fetch(
      `${TWITTER_CACHE_RESOURCE}?q=${this.props.query}&s=${
        this.props.signature
      }`,
    )
      .then((response) => {
        t.done();
        return response.json();
      })
      .then((data) => this.setState({ tweets: data, isLoading: false }))
      .catch((e) => this.setState({ tweets: e }));
  }

  getTweetQuantityForHeight() {
    let count = 0;
    let currentHeight = 0;

    each(this.state.tweets, (tweet) => {
      if (this.state.height && currentHeight > this.state.height) {
        count -= 1;
        return false;
      }

      count += 1;
      if (
        tweet.quoted_status ||
        (tweet.entities.media && tweet.entities.media.length > 0)
      ) {
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
        <ul
          className="TweetList"
          ref={(ref) => {
            this.listEL = ref;
          }}
        >
          <Loader dark />
        </ul>
      );
    }

    if (!isLoading && !tweets) {
      return (
        <ul className="TweetList">
          <p>{`Something went wong, we're unable to load the latest tweets`}</p>
        </ul>
      );
    }

    return (
      <ul className="TweetList">
        <FitOverflowChildren area="TweetList" minItems={3}>
          {tweets.map((tweet: TweetData) => (
            <Tweet data={tweet} key={tweet.id_str} />
          ))}
        </FitOverflowChildren>
        <a
          className="TweetList__view-more type-brevier"
          href="https://twitter.com/USSU/lists/ussu"
        >
          View on Twitter
        </a>
      </ul>
    );
  }
}

export default HydroLeaf({
  className: 'u-extend-flex',
  name: 'TweetList',
})(TweetList);
