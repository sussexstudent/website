import React from "react";
import {Event} from "../../types/events";

interface IProps {
  mslEventId: Event;
  onData(data: any): void;
}

interface IState {
  data: any;
}

export class MSLEventCommunication extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    window.onmessage = (e) => {
      const data = e.data;
      if (data.source === 'ussu-msl-frame-initial-data') {
        this.setState({ data: data.payload });
        console.log(data.payload);
        this.props.onData(data.payload);

        if (data.payload.pageMenuOptions) {
          (window as any).emitter.emit('changePageOptions', data.payload.pageMenuOptions);
        }
      }
    };
  }

  render() {
    const { mslEventId } = this.props;

    return (
      <iframe
        style={{ display: 'none' }}
        src={`/ents/event/${mslEventId}#communication`}
        frameBorder="0"
      />
    )
  }
}
