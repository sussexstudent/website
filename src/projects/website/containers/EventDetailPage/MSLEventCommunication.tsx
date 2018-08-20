import React from 'react';
import bind from 'bind-decorator';
import { connect } from 'react-redux';
import { replacePageActions } from '~website/ducks/page';

interface Dispatchers {
  replacePageActions: typeof replacePageActions;
}

interface IProps extends Dispatchers {
  ticketData: string;
  onData(data: any): void;
}

interface IState {
  data: any;
}

class MSLEventCommunicationComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  @bind
  handleMessage(e: MessageEvent) {
    const data = e.data;
    if (data.source === 'ussu-msl-frame-initial-data') {
      this.setState({ data: data.payload });
      this.props.onData(data.payload);

      if (data.payload.pageMenuOptions) {
        this.props.replacePageActions(data.payload.pageMenuOptions);
      }
    }
  }

  render() {
    const { ticketData } = this.props;

    return (
      <iframe
        style={{ display: 'none' }}
        src={`${ticketData}#communication`}
        frameBorder="0"
      />
    );
  }
}

export const MSLEventCommunication = connect(
  null,
  {
    replacePageActions,
  },
)((props: IProps) => <MSLEventCommunicationComponent {...props} />);
