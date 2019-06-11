import React from 'react';
import cx from 'classnames';
import FauxLink from '../../../FauxLink';
import {
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
  differenceInSeconds,
  isBefore,
  isAfter,
} from 'date-fns';
import { OneImageBackground } from '../../../OneImage';
import { SlateBox } from '@ussu/common/src/types/slates';

export enum HighlightTheme {
  BlackOnYellow = 'b_y',
  WhiteOnBlack = 'w_b',
}

interface IProps {
  link: string;
  imageUrl: string;
  votingStartsDate: string;
  votingEndsDate: string;
  theme?: HighlightTheme;
  liveCounting?: boolean;
}

interface IState {
  now: Date;
}

const timeBox = { width: '100%', flex: '1 1 auto' };

export class VoteNowBox extends React.Component<IProps, IState> {
  interval: number | undefined;

  state = {
    now: new Date(),
  };

  componentDidMount() {
    this.interval = window.setInterval(
      () => this.setState({ now: new Date() }),
      1000,
    );
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  renderVotingClosed() {
    return <h1>Voting closed</h1>;
  }

  renderVotingCountdown() {
    const { votingEndsDate, votingStartsDate } = this.props;
    const { now } = this.state;

    const isVotingOpen = isAfter(now, new Date(votingStartsDate));

    const targetDate = isVotingOpen
      ? new Date(votingEndsDate)
      : new Date(votingStartsDate);

    const days = differenceInDays(targetDate, now);
    const hours = differenceInHours(targetDate, now) - days * 24;
    const minutes =
      differenceInMinutes(targetDate, now) - days * 24 * 60 - hours * 60;
    const seconds =
      differenceInSeconds(targetDate, now) -
      days * 24 * 60 * 60 -
      hours * 60 * 60 -
      minutes * 60;

    return (
      <React.Fragment>
        <h1
          className={cx('type-canon')}
          style={{
            backgroundColor: '#000',
            color: '#fff',
            marginTop: '0.2rem',
            padding: '0.2em',
            paddingBottom: '0.1em',
            fontWeight: 600,
            display: 'inline-block',
            textTransform: 'uppercase',
          }}
        >
          Referenda
        </h1>
        <h2 className={cx('type-trafalgar')} style={{ marginBottom: '1rem' }}>
          Voting {isVotingOpen ? 'closes' : 'opens'} in
        </h2>
        <h2
          className={cx('type-double-pica')}
          style={{
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={timeBox}>
            <span>{days}</span>
            <span>
              {' '}
              day
              {days !== 1 ? 's' : null}
            </span>
          </div>
          <div style={timeBox}>
            <span>{hours}</span>
            <span>
              {' '}
              hour
              {hours !== 1 ? 's' : null}
            </span>
          </div>
          <div style={timeBox}>
            <span>{minutes}</span>
            <span>
              {' '}
              minute
              {minutes !== 1 ? 's' : null}
            </span>
          </div>
          <div style={timeBox}>
            <span>{seconds}</span>
            <span>
              {' '}
              second
              {seconds !== 1 ? 's' : null}
            </span>
          </div>
        </h2>
      </React.Fragment>
    );
  }

  render() {
    const { votingEndsDate, link, imageUrl } = this.props;
    const { now } = this.state;

    const hasVotingClosed = isBefore(new Date(votingEndsDate), now);

    return (
      <div className="BentoBox" style={{ backgroundColor: '#e95452' }}>
        <OneImageBackground
          className="BentoBox__background-image"
          src={imageUrl}
        >
          <FauxLink href={link} />
          <div
            style={{
              paddingLeft: '1rem',
              paddingBottom: '1rem',
              color: '#fff',
              width: '100%',
            }}
          >
            {hasVotingClosed
              ? this.renderVotingClosed()
              : this.renderVotingCountdown()}
          </div>
        </OneImageBackground>
      </div>
    );
  }
}

export const SlateBoxVoteNow: SlateBox = {
  component: VoteNowBox,
  schema: {
    type: 'object',
    properties: {
      votingStartsDate: { type: 'string' },
      votingEndsDate: { type: 'string' },
    },
  },
  uiSchema: {},
  displayName: 'Vote Now',
  category: 'specials',
};
