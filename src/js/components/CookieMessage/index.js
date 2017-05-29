import React from 'react';

class CookieMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hidden: false };

    this.handleHide = this.handleHide.bind(this);
  }

  handleHide() {
    this.setState({ hidden: true });
  }

  render() {
    if (this.state.hidden) {
      return null;
    }

    return (
      <div className="GlobalNotice">
        {
          'This site uses cookies. By continuing to browse, you agree to our use of cookies on the site. '
        }
        <a href="/cookie-policy">Learn more</a>.
        <button
          className="GlobalNotice__close"
          title="Close"
          onClick={this.handleHide}
        >
          <span className="u-h">
            Close
          </span>
        </button>
      </div>
    );
  }
}

export default CookieMessage;
