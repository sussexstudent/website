import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

interface IProps {
  value: string;
}

interface IState {
  hasCopied: boolean;
}

class CopyToClipboardButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasCopied: false,
    };
  }

  render() {
    const { hasCopied } = this.state;
    return (
      <CopyToClipboard
        text={this.props.value}
        onCopy={() => this.setState({ hasCopied: true })}
      >
        <button className="Button">
          {hasCopied ? 'Copied!' : this.props.children}
        </button>
      </CopyToClipboard>
    );
  }
}

export default CopyToClipboardButton;
