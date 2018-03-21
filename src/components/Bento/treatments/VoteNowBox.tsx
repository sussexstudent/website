import React from 'react';
import cx from 'classnames';
import FauxLink from '~components/FauxLink';
import {differenceInDays, differenceInMinutes, differenceInHours, differenceInSeconds} from 'date-fns';
import HydroLeaf from "~components/HydroLeaf";
import CountUp from "react-countup";
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
  voterCount: null | number;
}

const timeBox = { width: '100%', flex: '1 1 auto' };

class VoteNowBoxComponent extends React.Component<IProps, IState> {
  interval: number | undefined;

  private socket?: WebSocket;

  state = {
    now: new Date(),
    voterCount: 1000,
  };

  componentDidMount() {
    this.interval = window.setInterval(() => this.setState({ now: new Date() }), 1000);


    this.socket = new WebSocket("wss://ding-server-obpgpmmjny.now.sh/", "protocolOne");

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.name === 'initial') {
        this.setState({
          voterCount: data.data.Voters,
        });

        return
      }

      if (data.name !== 'schoolChange') {
        return;
      }

      const newCount = Object.keys(data.data).reduce((count, school) => {
        return data.data[school] + count;
      }, 0);

      this.setState((state: IState) => ({...state, voterCount: state.voterCount + newCount}));

    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { targetDate, link, imageUrl } = this.props;
    const { now, voterCount } = this.state;

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
            <div>
              <div className="type-long-primer type-primary" style={{ display: 'inline-block', background: '#fff', color: '#000', padding: '0.3em', textTransform: 'uppercase', fontWeight: 600, border: '3px solid #000' }}>{voterCount ? <span>Join the <CountUp start={0} end={voterCount} duration={4} /> students already voted</span> : 'placeholder'}</div>
            </div>
            <h1 className={cx('type-canon')} style={{ backgroundColor: '#000', color: '#fff', marginTop: '0.2rem', padding: '0.2em', paddingBottom: '0.1em', fontWeight: 600, display: 'inline-block', textTransform: 'uppercase' }}>Vote now</h1>
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
