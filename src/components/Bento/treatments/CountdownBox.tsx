import React from 'react';
import cx from 'classnames';
import FauxLink from '~components/FauxLink';
import {differenceInDays, differenceInMinutes, differenceInHours, differenceInSeconds} from 'date-fns';
import HydroLeaf from "~components/HydroLeaf";

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

class CountdownBoxComponent extends React.Component<IProps, IState> {
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
    const { targetDate, link } = this.props;
    const { now } = this.state;

    const days = differenceInDays(targetDate, now);
    const hours = differenceInHours(targetDate, now) - (days * 24);
    const minutes = differenceInMinutes(targetDate, now) - (days * 24 * 60) - hours * 60;
    const seconds = differenceInSeconds(targetDate, now) - (days * 24 * 60 * 60) - hours * 60 * 60 - (minutes * 60);

    return (
      <div className="BentoBox" style={{ backgroundColor: '#e95452' }}>
        <FauxLink href={link} />
          <div style={{ paddingLeft: '1rem', paddingBottom: '1rem', color: '#fff' }}>
            <h2
              className={cx('type-trafalgar')}
              style={{ marginBottom: '1rem' }}
            >Voting opens in</h2>
            <h2
              className={cx('type-trafalgar')}
              style={{ marginBottom: '1rem' }}
            >
              <div>
                <span>{days}</span>
                <span> day{days !== 1 ? 's' : null}</span>
              </div>
              <div>
                <span>{hours}</span>
                <span> hour{hours !== 1 ? 's' : null}</span>
              </div>
              <div>
                <span>{minutes}</span>
                <span> minute{minutes !== 1 ? 's' : null}</span>
              </div>
              <div>
                <span>{seconds}</span>
                <span> second{seconds !== 1 ? 's' : null}</span>
              </div>
            </h2>
          </div>
      </div>
    );
  }
}

const CountdownBox = HydroLeaf({ name: 'CountdownBox' })(CountdownBoxComponent)

export { CountdownBox };
