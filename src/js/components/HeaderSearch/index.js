import React from 'react';
import cx from 'classnames';
import SearchPage from '../../apps/search';

const header = document.querySelector('.Header');

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
      isOpen: false,
      hasFocus: false,
      transitionSize: null,
    };

    this.handleBlur = this.handleHasFocus.bind(this, false);
    this.handleFocus = this.handleHasFocus.bind(this, true);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasFocus && !prevState.hasFocus) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ transitionSize: null });
    }
  }

  handleInputChange(e) {
    this.setState({ query: e.target.value });
  }

  handleHasFocus(hasFocus) {
    const isOpen = hasFocus || this.state.query !== null;

    this.setState({
      hasFocus,
      isOpen,
      transitionSize: hasFocus ? {
        paddingLeft: this.dummyInput.offsetLeft,
        width: this.dummyInput.clientWidth,
      } : null,
    });

    if (isOpen) {
      header.classList.add('Header--search-focus');
    } else {
      header.classList.remove('Header--search-focus');
    }
  }

  renderSearching() {
    return (
      <div className="InlineSearch__content">
        <form
          className={cx('InlineSearch__input')}
          style={this.state.transitionSize}
        >
          <div className="HeaderSearch__highlight">{this.state.query}</div>
          <input
            className="HeaderSearch HeaderSearch--no-outline"
            placeholder="Search"
            value={this.state.query}
            onBlur={this.handleBlur}
            onChange={this.handleInputChange}
            autoFocus
          />
          <button className="HeaderSearch__submit" type="submit">
            <span className="u-h">Search</span>
          </button>
        </form>
        <SearchPage query={this.state.query} />
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

        {isOpen ? this.renderSearching() : null}

        <div className="InlineSearch__backdrop" />
      </div>
    );
  }
}

export default HeaderSearch;
