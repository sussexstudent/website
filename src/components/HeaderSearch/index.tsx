import React from 'react';
import cx from 'classnames';
import { Portal } from 'react-portal';
import CSSTransition from 'react-transition-group/CSSTransition';
import SearchPage from '~components/SearchPage';
import smoothscroll from '~libs/smoothscroll';
import classToggle from '~libs/dom/classToggle';

function getDistanceFromUserBar(userBarEl: HTMLDivElement) {
  const offset = userBarEl.getBoundingClientRect().top;
  return Math.abs(offset);
}

function getCoords(elem: HTMLElement) {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + (scrollTop - clientTop);
  const left = box.left + (scrollLeft - clientLeft);

  return { top: Math.round(top), left: Math.round(left) };
}

const SearchHeaderAnimated: React.SFC<any> = ({ children, ...props }) => {
  return (
    <CSSTransition {...props} classNames="test" timeout={300}>
      {children}
    </CSSTransition>
  );
};

interface IProps {
  disabled?: boolean;
}

interface IState {
  query: string;
  isOpen: boolean;
  hasFocus: boolean;
  isMobile: boolean | null;
  transitionSize: null | {
    paddingRight: number;
    width: number;
  };
}

class HeaderSearch extends React.Component<IProps, IState> {
  private handleBlur: () => void;
  private handleFocus: () => void;
  private handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  private escapeClose: (e: KeyboardEvent) => void;

  private header: HTMLDivElement | null;
  private userBarEl: HTMLDivElement | null;
  private htmlEl: HTMLElement | null;
  private input: HTMLInputElement | null;
  private dummyInput: HTMLInputElement | null;

  static defaultProps = {
    disabled: false,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      query: '',
      isOpen: false,
      hasFocus: false,
      isMobile: null,
      transitionSize: null,
    };

    this.handleBlur = this.handleHasFocus.bind(this, false);
    this.handleFocus = this.handleHasFocus.bind(this, true);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBackdropClose = this.handleBackdropClose.bind(this);
    this.handleExitClose = this.handleExitClose.bind(this);
    this.handleQueryClear = this.handleQueryClear.bind(this);
    this.handleSubmit = (e) => e.preventDefault();
    this.escapeClose = (event) => {
      if (event.key === 'Escape') {
        this.setState({ query: '' }, () => {
          this.handleHasFocus(false);
        });
      }
    };
  }

  componentDidMount() {
    this.header = document.querySelector('.Header');
    this.userBarEl = document.querySelector('.UserBar');
    this.htmlEl = document.documentElement;
  }

  componentDidUpdate(_prevProps: IProps, prevState: IState) {
    if (this.state.isOpen && !prevState.isOpen) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ transitionSize: null });
    }
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ query: e.target.value });
  }

  handleHasFocus(hasFocus: boolean) {
    const isOpen = hasFocus || this.state.query !== '';

    if (isOpen === this.state.isOpen) {
      return;
    }
    const isMobile = window.innerWidth < 800;

    this.setState({ isMobile }, () => {
      if (this.htmlEl && this.userBarEl) {
        classToggle(this.htmlEl, 'html--search-active', isOpen);

        if (isOpen) {
          if (isMobile) {
            this.handleOpen();
          } else {
            const distance = Math.abs(getDistanceFromUserBar(this.userBarEl));
            if (distance >= 10) {
              const time = Math.round(distance * 3.85);
              setTimeout(this.handleOpen.bind(this), time);
              (smoothscroll as any)(this.userBarEl, time); // todo
            } else {
              window.scrollTo(0, getCoords(this.userBarEl).top);
              this.handleOpen();
            }
          }
        } else {
          this.handleClose();
        }
      }
    });
  }

  handleOpen() {
    if (this.dummyInput && this.header) {
      this.setState({
        isOpen: true,
        transitionSize: {
          paddingRight: this.dummyInput.offsetLeft,
          width: this.dummyInput.clientWidth,
        },
      });
      this.header.classList.add('Header--search-focus');

      document.addEventListener('keyup', this.escapeClose);
    }
  }

  handleClose() {
    this.setState({
      isOpen: false,
      transitionSize: null,
    });

    this.header && this.header.classList.remove('Header--search-focus');
    document.removeEventListener('keyup', this.escapeClose);
  }

  handleBackdropClose() {
    if (this.state.query === '') {
      this.handleHasFocus(false);
    }
  }

  handleExitClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.setState({ query: '' }, () => {
      this.handleHasFocus(false);
    });
  }

  handleQueryClear(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.setState({ query: '' }, () => this.input && this.input.focus());
  }

  renderSearching(isOpen: boolean) {
    return (
      <div>
        {isOpen ? (
          <div className="InlineSearch__input-container">
            <form
              className={cx('InlineSearch__input')}
              style={this.state.transitionSize || {}}
              onSubmit={this.handleSubmit}
            >
              <button
                className="InlineSearch__exit"
                type="button"
                onClick={this.handleExitClose}
              >
                <span className="u-h">Exit search</span>
              </button>
              <input
                className="HeaderSearch HeaderSearch--no-outline"
                type="text"
                placeholder="Search"
                value={this.state.query}
                onBlur={this.handleBlur}
                onChange={this.handleInputChange}
                autoFocus={isOpen}
                ref={(input) => {
                  this.input = input;
                }}
              />
              {this.state.query ? (
                <button
                  className="InlineSearch__clear"
                  type="button"
                  onClick={this.handleQueryClear}
                >
                  <span className="u-h">Clear search</span>
                </button>
              ) : null}
            </form>
          </div>
        ) : null}
        <div className="InlineSearch__content">
          <SearchHeaderAnimated in={isOpen} mountOnEnter unmountOnExit>
            {<div className="InlineSearch__header" />}
          </SearchHeaderAnimated>
          {isOpen ? (
            <div>
              <SearchPage query={this.state.query} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  renderMobileSearch() {
    return (
      <Portal>
        <div className="MobileSearch">
          <form
            className={cx('InlineSearch__input')}
            onSubmit={this.handleSubmit}
          >
            <button
              className="InlineSearch__exit"
              type="button"
              onClick={this.handleExitClose}
            >
              <span className="u-h">Exit search</span>
            </button>
            <input
              className="HeaderSearch HeaderSearch--no-outline"
              type="text"
              placeholder="Search"
              value={this.state.query}
              onBlur={this.handleBlur}
              onChange={this.handleInputChange}
              autoFocus={this.state.isOpen}
              ref={(input) => {
                this.input = input;
              }}
            />
            {this.state.query ? (
              <button
                className="InlineSearch__clear"
                type="button"
                onClick={this.handleQueryClear}
              >
                <span className="u-h">Clear search</span>
              </button>
            ) : null}
          </form>
          <SearchPage query={this.state.query} />
        </div>
      </Portal>
    );
  }

  render() {
    const { disabled } = this.props;
    const { isOpen, isMobile } = this.state;
    const containerClasses = cx('InlineSearch', {
      'InlineSearch--isOpen': isOpen,
    });

    return (
      <div className={containerClasses}>
        <input
          className="HeaderSearch HeaderSearch--search-icon"
          placeholder={disabled ? 'Search unavailable' : 'Search'}
          aria-label="search"
          value={this.state.query}
          onChange={this.handleInputChange}
          onFocus={this.handleFocus}
          ref={(el) => {
            this.dummyInput = el;
          }}
          disabled={disabled}
        />

        {this.renderSearching(isOpen && !isMobile)}
        {isOpen && isMobile ? this.renderMobileSearch() : null}
        <CSSTransition
          in={isOpen && !isMobile}
          classNames="fade"
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {
            <div
              className="InlineSearch__backdrop"
              onClick={this.handleBackdropClose}
            />
          }
        </CSSTransition>
      </div>
    );
  }
}

export default HeaderSearch;
