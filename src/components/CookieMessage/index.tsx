import React from 'react';
import bind from 'bind-decorator';

interface IProps {}

interface IState {
  hidden: boolean;
}

class CookieMessage extends React.Component<IProps, IState> {
  state = { hidden: false };

  @bind
  handleHide() {
    this.setState({ hidden: true });
  }

  render() {
    if (this.state.hidden) {
      return null;
    }

    return (
      <div className="CookieNotice">
        <div className="CookieNotice__blimp">
          {
            'This site uses cookies. By continuing to browse, you agree to our use of cookies on the site. '
          }
          <a href="/cookie-policy">Learn more</a>.
          <div className="CookieNotice__action">
            <button
              className="Button"
              title="Close"
              onClick={this.handleHide}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CookieMessage;
