import React from 'react';
import cx from 'classnames';
import FauxLink from '~components/FauxLink';
import {differenceInDays, differenceInMinutes, differenceInHours, differenceInSeconds} from 'date-fns';
import HydroLeaf from "~components/HydroLeaf";
import {OneImageBackground} from "~components/OneImage";

export enum HighlightTheme {
  BlackOnYellow = 'b_y',
  WhiteOnBlack = 'w_b',
}

interface IProps {
  link: string;
  imageUrl: string;
  targetDate: Date;
  theme?: HighlightTheme;
}

interface IState {
  now: Date;
}

const timeBox = { width: '100%', flex: '1 1 auto' };

class VoteNowBoxComponent extends React.Component<IProps, IState> {
  interval: number | undefined;

  state = {
    now: new Date(),
  };

  componentDidMount() {
    this.interval = window.setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { targetDate, link, imageUrl } = this.props;
    const { now } = this.state;

    const days = differenceInDays(targetDate, now);
    const hours = differenceInHours(targetDate, now) - (days * 24);
    const minutes = differenceInMinutes(targetDate, now) - (days * 24 * 60) - hours * 60;
    const seconds = differenceInSeconds(targetDate, now) - (days * 24 * 60 * 60) - hours * 60 * 60 - (minutes * 60);

    return (
      <div className="BentoBox" style={{ backgroundColor: '#e95452' }}>
        <OneImageBackground
          className="BentoBox__background-image"
          src={imageUrl}
        >
        <FauxLink href={link} />
          <div style={{ paddingLeft: '1rem', paddingBottom: '1rem', color: '#fff', width: '100%' }}>
            <h1 className={cx('type-canon')} style={{ backgroundColor: '#000', color: '#fff', padding: '0.2em', fontWeight: 600, display: 'inline-block', textTransform: 'uppercase' }}>Vote now</h1>
            <h2
              className={cx('type-trafalgar')}
              style={{ marginBottom: '1rem' }}
            >Voting closes in</h2>
            <h2
              className={cx('type-double-pica')}
              style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}
            >
              <div style={timeBox}>
                <span>{days}</span>
                <span> day{days !== 1 ? 's' : null}</span>
              </div>
              <div style={timeBox}>
                <span>{hours}</span>
                <span> hour{hours !== 1 ? 's' : null}</span>
              </div>
              <div style={timeBox}>
                <span>{minutes}</span>
                <span> minute{minutes !== 1 ? 's' : null}</span>
              </div>
              <div style={timeBox}>
                <span>{seconds}</span>
                <span> second{seconds !== 1 ? 's' : null}</span>
              </div>
            </h2>
          </div>
        </OneImageBackground>
      </div>
    );
  }
}

const VoteNowBox = HydroLeaf({ name: 'VoteNowBox', disableSSR: true })(VoteNowBoxComponent);

export { VoteNowBox };
