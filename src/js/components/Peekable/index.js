import React from 'react';
import cx from 'classnames';

class Peekable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  render() {
    const { children, expandText } = this.props;

    return (
      <div className={cx('Peekable', { 'Peekable--isOpen': this.state.open })}>
        {children}
        <div className="Peekable__mask">
          <div className="Peekable__button">
            <button
              className="Button Button--above"
              onClick={this.handleOpen.bind(this)}
            >
              {expandText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Peekable;
