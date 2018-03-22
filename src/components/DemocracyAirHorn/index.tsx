import React from 'react';
import CountUp from 'react-countup';
import bind from 'bind-decorator';
import { Howl } from 'howler';
import HydroLeaf from "~components/HydroLeaf";

interface IProps {

}

interface IState {
  now: Date;
  voterCountStart: number;
  voterCountEnd: number;
  button: boolean;
}

const horn = new Howl({
  src: [require('./horn.mp3')]
});

@HydroLeaf({ name: 'DemocracyAirHorn', disableSSR: true })
export default class DemocracyAirHorn extends React.Component<IProps, IState> {
  private socket?: WebSocket;

  state = {
    now: new Date(),
    voterCountStart: 0,
    voterCountEnd: 1000,
    button: true,
  };

  componentDidMount() {
    this.socket = new WebSocket("wss://ding-server-xzywabxhzp.now.sh/", "protocolOne");

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.name === 'initial') {
        this.setState({
          voterCountEnd: data.data.Voters,
        });

        return
      }

      if (data.name !== 'schoolChange') {
        return;
      }

      const newCount = Object.keys(data.data).reduce((count, school) => {
        return data.data[school] + count;
      }, 0);

    Array(newCount).fill(newCount).forEach((_i, index) => {
      setTimeout(() => this.playHorn(), 600 * index);
    });

      this.setState((state: IState) => ({...state, voterCountStart: state.voterCountEnd, voterCountEnd: state.voterCountEnd + newCount}));

    }
  }

  @bind
  playHorn() {
    horn.play();
  }

  @bind
  hideButton() {
    this.playHorn();
    this.setState({ button: false, })
  }

  render() {
    const { voterCountStart, voterCountEnd, button } = this.state;

    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2em', textTransform: 'uppercase', lineHeight: 1.4 }}>Welcome to the democracy air horn</h2>
        <h1 style={{ fontSize: '5.2em', marginTop: '0.5em' }}><CountUp start={voterCountStart} end={voterCountEnd} duration={4} /></h1>
        <h3 style={{ fontSize: '1.2em' }}>voters so far</h3>
        <p><em>Every voter causes a live play of the air horn.</em></p>
        <p><em>Already voted? Remind your friends to vote and listen to democracy in real time.</em></p>
        {button ? <button className="Button" style={{ marginTop: '3rem' }} onClick={this.hideButton}>On mobile & sound not working?</button> : null}
      </div>
    )
  }
}
