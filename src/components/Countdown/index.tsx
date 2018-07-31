import React from 'react';
import {
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
  differenceInSeconds,
} from 'date-fns';

interface CountdownProps {
  targetDate: Date;
}

interface CountdownState {
  now: Date;
}

export class Countdown extends React.Component<CountdownProps, CountdownState> {
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

  render() {
    const { targetDate } = this.props;
    const { now } = this.state;

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
      <div>
        <div>
          <span>{days}</span>
          <span>
            {' '}
            day
            {days !== 1 ? 's' : null}
          </span>
        </div>
        <div>
          <span>{hours}</span>
          <span>
            {' '}
            hour
            {hours !== 1 ? 's' : null}
          </span>
        </div>
        <div>
          <span>{minutes}</span>
          <span>
            {' '}
            minute
            {minutes !== 1 ? 's' : null}
          </span>
        </div>
        <div>
          <span>{seconds}</span>
          <span>
            {' '}
            second
            {seconds !== 1 ? 's' : null}
          </span>
        </div>
      </div>
    );
  }
}
