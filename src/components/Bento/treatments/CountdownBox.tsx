import React from 'react';
import cx from 'classnames';
import FauxLink from '~components/FauxLink';
import { OneImageBackground } from '~components/OneImage';
import { useCountdown } from 'src/hooks/useCountdown';

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
    const { link, imageUrl } = this.props;
    const countdown = useCountdown(new Date(2019, 9, 21, 12, 0, 0));

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
            }}
          >
            <h2
              className={cx('type-trafalgar')}
              style={{ marginBottom: '1rem' }}
            >
              Voting opens in
            </h2>
            <h2
              className={cx('type-trafalgar')}
              style={{ marginBottom: '1rem' }}
            >
              <div>
                <span>{countdown.days}</span>
                <span>
                  {' '}
                  day
                  {countdown.days !== 1 ? 's' : null}
                </span>
              </div>
              <div>
                <span>{countdown.hours}</span>
                <span>
                  {' '}
                  hour
                  {countdown.hours !== 1 ? 's' : null}
                </span>
              </div>
              <div>
                <span>{countdown.minutes}</span>
                <span>
                  {' '}
                  minute
                  {countdown.minutes !== 1 ? 's' : null}
                </span>
              </div>
              <div>
                <span>{countdown.seconds}</span>
                <span>
                  {' '}
                  second
                  {countdown.seconds !== 1 ? 's' : null}
                </span>
              </div>
            </h2>
          </div>
        </OneImageBackground>
      </div>
    );
  }
}

const CountdownBox = CountdownBoxComponent;

export { CountdownBox };
