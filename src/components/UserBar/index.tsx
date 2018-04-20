import React from 'react';
import cx from 'classnames';
import ClickOutside from 'react-onclickout';
import client, { ClientAuth } from '~libs/user';
import Hydroleaf from '~components/HydroLeaf';

enum DropdownState {
  Page,
  Admin,
}

interface IProps {}

interface IState {
  isLoaded: boolean;
  dropdownOpen: DropdownState | null;
  auth: ClientAuth | null;
}

class UserBar extends React.Component<IProps, IState> {
  private handleToggleDropdown: (dropdown: DropdownState) => void;
  private handleTogglePageDropdown: () => void;
  private handleToggleAdminDropdown: () => void;
  private handleCloseDropdown: (e: React.MouseEvent<HTMLElement>) => void;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoaded: false,
      dropdownOpen: null,
      auth: null,
    };

    this.handleToggleDropdown = (dropdown) =>
      this.setState({
        dropdownOpen: dropdown === this.state.dropdownOpen ? null : dropdown,
      });
    this.handleTogglePageDropdown = this.handleToggleDropdown.bind(
      this,
      DropdownState.Page,
    );
    this.handleToggleAdminDropdown = this.handleToggleDropdown.bind(
      this,
      DropdownState.Admin,
    );
    this.handleCloseDropdown = (
      e: React.MouseEvent<HTMLElement | Document>,
    ) => {
      if (
        e.currentTarget.parentElement &&
        e.currentTarget.parentElement.classList.contains('UserBar__item')
      ) {
        return;
      }

      this.setState({ dropdownOpen: null });
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const { auth } = client || { auth: null };
      this.setState((state) => ({
        ...state,
        auth,
        isLoaded: true,
      }));
    }, 1);

    // trying to avoid using some sort of state container for now. hacky
    (window as any).emitter.on('changePageOptions', (options: any) => {
      this.setState((state) => ({
        auth: ({ ...state.auth, page: options } as ClientAuth)
      }));
    })
  }

  renderLoaded() {
    const { auth, dropdownOpen } = this.state;

    if (!auth) {
      return null;
    }

    const { isLoggedIn, profile, admin, page, actionBound } = auth;

    if (isLoggedIn) {
      return (
        <ul className="UserBar__list">
          <li className="UserBar__item UserBar__item--welcome">
            Hi {profile.firstName}!
          </li>
          <li className="UserBar__item UserBar__item--action">
            <button onClick={actionBound} type="button">
              Log out
            </button>
          </li>

          {admin !== null ? (
            <li
              className={cx(
                'UserBar__item UserBar__item-admin UserBar__admin-menu',
                {
                  'UserBar__item--open': true,
                },
              )}
            >
              <button onClick={this.handleToggleAdminDropdown} type="button">
                Admin
              </button>
              {dropdownOpen === DropdownState.Admin ? (
                <ClickOutside onClickOut={this.handleCloseDropdown}>
                  <div className={cx('UserBar__item-dropdown')}>
                    <ul className="UserBar__dropdown-list">
                      {admin.admin.map((item) => (
                        <li key={item.name}>
                          <a href={item.link}>{item.name}</a>
                        </li>
                      ))}
                      <hr />
                      {admin.orgs.map((item) => (
                        <li key={item.name}>
                          <a href={item.link}>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ClickOutside>
              ) : null}
            </li>
          ) : null}
          {page !== null ? (
            <li
              className={cx(
                'UserBar__item UserBar__item-admin UserBar__admin-menu',
                {
                  'UserBar__item--open': true,
                },
              )}
            >
              <button onClick={this.handleTogglePageDropdown} type="button">
                Page
              </button>
              {dropdownOpen === DropdownState.Page ? (
                <ClickOutside onClickOut={this.handleCloseDropdown}>
                  <div
                    className={cx('UserBar__item-dropdown', {
                      'UserBar__item--open':
                        dropdownOpen === DropdownState.Page,
                    })}
                  >
                    <ul className="UserBar__dropdown-list">
                      {page.items.map((item) => (
                        <li key={item.name}>
                          <a href={item.link}>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ClickOutside>
              ) : null}
            </li>
          ) : null}

          <li className="UserBar__item UserBar__item--action UserBar__item--action-highlight">
            <a href="/shop/basket">Basket</a>
          </li>
        </ul>
      );
    }
    return (
      <ul className="UserBar__list">
        <li className="UserBar__item">Hi there!</li>
        <li className="UserBar__item UserBar__item--action">
          <a href="/login" data-action="login">
            Log in
          </a>
        </li>
        <li className="UserBar__item UserBar__item--action UserBar__item--action-highlight">
          <a href="/shop/basket">Basket</a>
        </li>
      </ul>
    );
  }

  render() {
    const { isLoaded } = this.state;
    if (isLoaded) {
      return this.renderLoaded();
    }

    return (
      <ul className="UserBar__list" style={{ visibility: 'hidden' }}>
        <li className="UserBar__item UserBar__item">Loading</li>
      </ul>
    );
  }
}

export default UserBar;

function DesktopContainer() {
  return (
    <div className="Container UserBar__container">
      {/* <button */}
      {/* className="UserBar__a11y" */}
      {/* type="button" */}
      {/* onClick={() => window.loadRecite()} */}
      {/* > */}
      {/* Accessibility */}
      {/* </button> */}
      <UserBar />
    </div>
  );
}

export const DesktopUserBar = Hydroleaf({
  className: 'UserBar UserBar--desktop',
  name: 'UserBar',
})(DesktopContainer);
