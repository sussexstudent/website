import React from 'react';
import cx from 'classnames';
import SearchPage from '../../apps/search';

const header = document.querySelector('.Header');

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      isOpen: false,
      hasFocus: false,
      transitionSize: null,
    };

    this.handleBlur = this.handleHasFocus.bind(this, false);
    this.handleFocus = this.handleHasFocus.bind(this, true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasFocus && !prevState.hasFocus) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ transitionSize: null });
    }
  }

  handleHasFocus(hasFocus) {
    this.setState({
      hasFocus,
      transitionSize: {
        paddingLeft: this.dummyInput.offsetLeft,
        width: this.dummyInput.clientWidth,
      },
    });

    if (hasFocus) {
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
          <input
            className="HeaderSearch HeaderSearch--no-outline"
            placeholder="Search"
            onBlur={this.handleBlur}
            autoFocus
          />
          <button className="HeaderSearch__submit" type="submit">
            <span className="u-h">Search</span>
          </button>
        </form>
        <SearchPage searchTerm="vegsoc" />
      </div>
    );
  }

  render() {
    const { hasFocus } = this.state;
    const containerClasses = cx('InlineSearch', { 'InlineSearch--isOpen': hasFocus });

    return (
      <div className={containerClasses}>
        <input
          className="HeaderSearch"
          placeholder="Search"
          onFocus={this.handleFocus}
          ref={(el) => { this.dummyInput = el; }}
        />

        {hasFocus ? this.renderSearching() : null}

        <div className="InlineSearch__backdrop" />
      </div>
    );
  }
}

export default HeaderSearch;
