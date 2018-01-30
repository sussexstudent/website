import React from 'react';
import cx from 'classnames';
import { Portal } from 'react-portal';
import CSSTransition from 'react-transition-group/CSSTransition';
import classToggle from '~libs/dom/classToggle';
import SearchPage from '~components/SearchPage';

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

interface IState {
  query: string;
  isOpen: boolean;
  hasFocus: boolean;
  isMobile: boolean | null;
  isRendered: boolean;
}

class HeaderSearch extends React.Component<IProps, IState> {
  private handleBlur: () => void;
  private handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  private handleTouch: (e: any) => void; // todo

  private input: HTMLInputElement | null;
  private header: HTMLDivElement;
  private htmlEl: HTMLElement;

  constructor(props: IProps) {
    super(props);

    this.state = {
      query: '',
      isOpen: false,
      hasFocus: false,
      isMobile: null,
      isRendered: false,
    };

    this.handleBlur = this.handleHasFocus.bind(this, false);
    // this.handleFocus = this.handleHasFocus.bind(this, true);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBackdropClose = this.handleBackdropClose.bind(this);
    this.handleExitClose = this.handleExitClose.bind(this);
    this.handleQueryClear = this.handleQueryClear.bind(this);
    this.handleSubmit = (e) => e.preventDefault();

    this.handleTouch = (e) => {
      if (this.state.query === '') {
        e.preventDefault();
      }
    };
  }

  componentDidMount() {
    this.header = document.querySelector('.Header') as HTMLDivElement;
    this.htmlEl = document.documentElement as HTMLDivElement;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.isOpen !== this.props.isOpen && this.htmlEl !== null) {
      if (nextProps.isOpen) {
        classToggle(this.htmlEl, 'html--search-active', nextProps.isOpen);
        setTimeout(
          () =>
            this.setState({ isRendered: true }, () => {
              this.setInputFocus();
            }),
          80,
        );
      } else {
        classToggle(this.htmlEl, 'html--search-active', nextProps.isOpen);
      }
    }
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ query: e.target.value });
  }

  handleHasFocus() {
    const { isOpen } = this.props;

    classToggle(this.htmlEl, 'html--search-active', isOpen);
    if (isOpen) {
      this.handleOpen();
    } else {
      this.handleClose();
    }
  }

  handleOpen() {
    this.header.classList.add('Header--search-focus');
  }

  handleClose() {
    this.header.classList.remove('Header--search-focus');
  }

  setInputFocus() {
    console.log(this.input);
    if (this.input) {
      this.input.focus();
    }
  }

  handleBackdropClose() {
    if (this.state.query === '') {
      // this.handleHasFocus(false);
      this.setState({
        isRendered: false,
      });
    }
  }

  handleExitClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.setState({
      isRendered: false,
      query: '',
    });
  }

  handleQueryClear(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.setState({ query: '' }, () => this.input && this.input.focus());
  }

  renderMobileSearch() {
    const { isOpen } = this.props;
    const { isRendered } = this.state;
    return isOpen ? (
      <Portal>
        <div className="MobileSearch" onTouchMove={this.handleTouch}>
          <CSSTransition
            in={isRendered}
            classNames="MobileSearchInput"
            timeout={300}
            onExited={() => this.props.onClose()}
          >
            {
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
                  autoFocus={this.state.isRendered}
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
            }
          </CSSTransition>
          <SearchPage query={this.state.query} />
          <CSSTransition
            in={isRendered}
            classNames="SearchFade"
            timeout={300}
            unmountOnExit
            mountOnEnter
          >
            {
              <div
                onClick={this.handleBackdropClose}
                className={cx('MobileSearch__backdrop', {
                  'MobileSearch__backdrop--active': this.state.query !== '',
                })}
              />
            }
          </CSSTransition>
        </div>
      </Portal>
    ) : null;
  }

  render() {
    const { isOpen } = this.props;
    const containerClasses = cx('InlineSearch', {
      'InlineSearch--isOpen': isOpen,
    });

    return <div className={containerClasses}>{this.renderMobileSearch()}</div>;
  }
}

export default HeaderSearch;
