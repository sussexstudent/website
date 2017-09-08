import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class CopyToClipboardButton extends React.Component {
  constructor(props) {
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
