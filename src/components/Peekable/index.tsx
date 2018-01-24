import React from 'react';
import cx from 'classnames';

interface IProps {
  expandText: string;
}

interface IState {
  open: boolean;
}

class Peekable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  @bind
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
              onClick={this.handleOpen}
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
