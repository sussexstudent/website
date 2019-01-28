import React from 'react';
import bind from 'bind-decorator';
import cx from 'classnames';
import ClickOutside from 'react-onclickout';
import client, { ClientAuth } from '~libs/user';
import Hydroleaf from '~components/HydroLeaf';
import { shuffle } from 'lodash';
import { connect } from 'react-redux';
import { WebsiteRootState } from '../../types/website';
import { PageState } from '../../projects/website/ducks/page';
import { UserState } from '../../projects/website/ducks/user';

enum DropdownState {
  Page,
  Admin,
}

interface IProps {
  page: PageState;
  user: UserState;
}

interface IState {
  isLoaded: boolean;
  dropdownOpen: DropdownState | null;
  auth: ClientAuth | null;
  greetingIndex: 0;
}

// Submit pull requests!
const greetings = shuffle([
  'Salut', // French
  'Hallo', // German
  'Hej', // Swedish,
  '早', // Chinese
  'Salve', // Italian
  'Hei', // Norwegian
  'Cześć', // Polish
  'Bună ziua', // Romanian
  'Saluton', // Esperanto,
  'Olá', // Portuguese,
]);

greetings.unshift('Hi');

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
      greetingIndex: 0,
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
    (window as any).emitter.on('changePageOptions', (_options: any) => {});
  }

  @bind
  handleGreetingPress() {
    this.setState(
      (state) =>
        ({
          greetingIndex:
            state.greetingIndex + 1 >= greetings.length
              ? 0
              : state.greetingIndex + 1,
        } as any),
    );
  }

  renderLoaded() {
    const {
      page: { menu },
      user: { isLoaded, isLoggedIn, profile, actionBound },
    } = this.props;
    const { dropdownOpen, greetingIndex } = this.state;

    if (!isLoaded) {
      return null;
    }

    if (isLoggedIn && profile) {
      return (
        <ul className="UserBar__list">
          <li
            className="UserBar__item UserBar__item--welcome"
            onClick={this.handleGreetingPress}
          >
            {greetings[greetingIndex]} {profile.firstName}!
          </li>
          <li className="UserBar__item UserBar__item--action">
            <button onClick={actionBound || undefined} type="button">
              Log out
            </button>
          </li>

          {menu.admin.areas.length > 0 || menu.admin.orgs.length > 0 ? (
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
                      {menu.admin.areas.map((item) => (
                        <li key={item.name}>
                          <a href={item.link}>{item.name}</a>
                        </li>
                      ))}
                      <hr />
                      {menu.admin.orgs.map((item) => (
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
          {menu.page.actions.length > 0 ? (
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
                      {menu.page.actions.map((item) => (
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
          <a href="/login">Log in</a>
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

const UserBarContainer: React.FC<{ page: PageState; user: UserState }> = (
  props,
) => <UserBar {...props} />;

const mapStateToProps = (state: WebsiteRootState) => ({
  page: state.page,
  user: state.user,
});

const UserBarConnected = connect(mapStateToProps)(UserBarContainer);

export default UserBarConnected;

function DesktopContainer() {
  return (
    <div className="Container UserBar__container">
      <UserBarConnected />
    </div>
  );
}

export const DesktopUserBar = Hydroleaf({
  className: 'UserBar UserBar--desktop',
  name: 'UserBar',
})(DesktopContainer);
