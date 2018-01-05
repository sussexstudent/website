import React from 'react';
import cx from 'classnames';
import ClickOutside from 'react-onclickout';
import client, {ClientAuth} from '~libs/user';
import Hydroleaf from '~components/HydroLeaf';

enum DropdownState {
  Page,
  Admin
}

interface IProps {

}

interface IState {
  isLoaded: boolean;
  dropdownOpen: DropdownState | null;
  auth: ClientAuth | null;
}

class UserBar extends React.Component<IProps, IState> {
  private handleToggleDropdown: (dropdown: DropdownState) => void;
  private handleTogglePageDropdown: () => void;
  private handleToggleAdminDropdown: () => void;
  private handleCloseDropdown: () => void;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoaded: false,
      dropdownOpen: null,
      auth: null
    };

    this.handleToggleDropdown = dropdown =>
      this.setState({
        dropdownOpen: dropdown === this.state.dropdownOpen ? null : dropdown,
      });
    this.handleTogglePageDropdown = this.handleToggleDropdown.bind(
      this,
      DropdownState.Page
    );
    this.handleToggleAdminDropdown = this.handleToggleDropdown.bind(
      this,
      DropdownState.Admin
    );
    this.handleCloseDropdown = () => this.setState({ dropdownOpen: null });
  }

  componentDidMount() {
    setTimeout(() => {
      const { auth } = client || { auth: null };
      this.setState(state => ({
        ...state,
        isLoaded: true,
        ...auth,
      }));
    }, 1);
  }

  renderLoaded() {
    const {
      auth,
      dropdownOpen,
    } = this.state;

    if (!auth) {
      return null;
    }

    const {
      isLoggedIn,
      profile,
      admin,
      page,
      actionBound,
    } = auth;

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
                  'UserBar__item--open': dropdownOpen === DropdownState.Admin,
                }
              )}
            >
              <button onClick={this.handleToggleAdminDropdown} type="button">
                Admin
              </button>
              <ClickOutside onClickOut={this.handleCloseDropdown}>
                <div className={cx('UserBar__item-dropdown')}>
                  <ul className="UserBar__dropdown-list">
                    {admin.admin.map(item => (
                      <li key={item.name}>
                        <a href={item.link}>{item.name}</a>
                      </li>
                    ))}
                    {admin.orgs.map(item => (
                      <li key={item.name}>
                        <a href={item.link}>{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </ClickOutside>
            </li>
          ) : null}
          {page !== null ? (
            <li
              className={cx(
                'UserBar__item UserBar__item-admin UserBar__admin-menu',
                {
                  'UserBar__item--open': dropdownOpen === DropdownState.Page,
                }
              )}
            >
              <button onClick={this.handleTogglePageDropdown} type="button">
                Page
              </button>
              <ClickOutside onClickOut={this.handleCloseDropdown}>
                <div
                  className={cx('UserBar__item-dropdown', {
                    'UserBar__item--open': dropdownOpen === DropdownState.Page,
                  })}
                >
                  <ul className="UserBar__dropdown-list">
                    {page.items.map(item => (
                      <li key={item.name}>
                        <a href={item.link}>{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </ClickOutside>
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
