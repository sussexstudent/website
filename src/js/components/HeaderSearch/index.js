import React from 'react';
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SearchPage from '../../apps/search';
import smoothscroll from '../../bits/smoothscroll';

const header = document.querySelector('.Header');
const advertBarEl = document.querySelector('.AdvertBar');
const userBarEl = document.querySelector('.UserBar');
const siteEl = document.querySelector('.Site');

function getDistanceFromUserBar() {
  const offset = userBarEl.getBoundingClientRect().top;
  return Math.abs(offset);
}

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
      isOpen: false,
      hasFocus: false,
    };

    this.handleBlur = this.handleHasFocus.bind(this, false);
    this.handleFocus = this.handleHasFocus.bind(this, true);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBackdropClose = this.handleBackdropClose.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen && !prevState.isOpen) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ transitionSize: null });
    }
  }

  handleInputChange(e) {
    this.setState({ query: e.target.value });
  }

  handleHasFocus(hasFocus) {
    const isOpen = hasFocus || this.state.query !== null;

    if (isOpen === this.state.isOpen) {
      return;
    }

    siteEl.classList.toggle('Site--locked', isOpen);

    if (isOpen) {
      const distance = Math.abs(getDistanceFromUserBar());
      if (distance >= 10) {
        const time = Math.round(distance * 3.85);
        setTimeout(this.handleOpen.bind(this), time);
        smoothscroll(userBarEl, time);
      } else {
        window.scrollTo(0, advertBarEl.getBoundingClientRect().height);
        this.handleOpen();
      }
    } else {
      this.handleClose();
    }
  }

  handleOpen() {
    this.setState({
      isOpen: true,
      transitionSize: {
        paddingLeft: this.dummyInput.offsetLeft,
        width: this.dummyInput.clientWidth,
      },
    });
    header.classList.add('Header--search-focus');
  }

  handleClose() {
    this.setState({
      isOpen: false,
      transitionSize: null,
    });

    header.classList.remove('Header--search-focus');
  }

  handleBackdropClose() {
    if (this.state.query === null) {
      this.handleHasFocus(false);
    }
  }

  renderSearching(isOpen) {
    return (
      <div>
        {isOpen ? (<div className="InlineSearch__input-container">
          <form
            className={cx('InlineSearch__input')}
            style={this.state.transitionSize}
          >
            <input
              className="HeaderSearch HeaderSearch--no-outline"
              placeholder="Search"
              value={this.state.query}
              onBlur={this.handleBlur}
              onChange={this.handleInputChange}
              autoFocus={isOpen}
            />
          </form>
        </div>) : null}
        <div className="InlineSearch__content">
          <ReactCSSTransitionGroup
            transitionName="test"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {isOpen ? <div className="InlineSearch__header" /> : null}
          </ReactCSSTransitionGroup>
          { isOpen ? <div className="Container--for-search">
            <SearchPage query={this.state.query} />
          </div> : null }
        </div>
      </div>
    );
  }

  render() {
    const { isOpen } = this.state;
    const containerClasses = cx('InlineSearch', { 'InlineSearch--isOpen': isOpen });

    return (
      <div className={containerClasses}>
        <input
          className="HeaderSearch HeaderSearch--search-icon"
          placeholder="Search"
          onFocus={this.handleFocus}
          ref={(el) => { this.dummyInput = el; }}
        />

        {this.renderSearching(isOpen)}
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          { // eslint-disable-next-line
          }{isOpen ? <div className="InlineSearch__backdrop" onClick={this.handleBackdropClose} /> : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default HeaderSearch;
