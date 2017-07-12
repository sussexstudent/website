import React from 'react';
import cx from 'classnames';
import ClickOutside from 'react-click-outside';
import Hydroleaf from '../HydroLeaf';
import currentUser from '../../libs/user';

const PAGE_DROPDOWN = 'page';
const ADMIN_DROPDOWN = 'admin';

class UserBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      dropdownOpen: null,
      isPageOpen: false,
    };

    this.handleOpenDropdown = dropdown =>
      this.setState({ dropdownOpen: dropdown });
    this.handleOpenPageDropdown = this.handleOpenDropdown.bind(
      this,
      PAGE_DROPDOWN
    );
    this.handleOpenAdminDropdown = this.handleOpenDropdown.bind(
      this,
      ADMIN_DROPDOWN
    );
    this.handleCloseDropdown = () => this.setState({ dropdownOpen: null });
  }

  componentDidMount() {
    setTimeout(() => {
      const { auth } = currentUser;
      console.log(currentUser);
      this.setState({
        isLoaded: true,
        ...auth,
      });
    }, 1);
  }

  renderLoaded() {
    const { isLoggedIn, details, admin, page, dropdownOpen } = this.state;

    if (isLoggedIn) {
      return (
        <ul className="UserBar__list">
          <li className="UserBar__item UserBar__item--welcome">
            Hi {details.firstName}!
          </li>
          <li className="UserBar__item UserBar__item--action">[Logout]</li>

          {admin !== null
            ? <li
                className={cx(
                  'UserBar__item UserBar__item-admin UserBar__admin-menu',
                  {
                    'UserBar__item--open': dropdownOpen === ADMIN_DROPDOWN,
                  }
                )}
              >
                <button onClick={this.handleOpenAdminDropdown}>Admin</button>
                <ClickOutside onClickOutside={this.handleCloseDropdown}>
                  <div className={cx('UserBar__item-dropdown')}>
                    <ul>
                      {admin.admin.map(item =>
                        <li>
                          <a href={item.link}>
                            {item.name}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </ClickOutside>
              </li>
            : null}
          {page !== null
            ? <li
                className={cx(
                  'UserBar__item UserBar__item-admin UserBar__admin-menu',
                  {
                    'UserBar__item--open': dropdownOpen === PAGE_DROPDOWN,
                  }
                )}
              >
                {' '}<button onClick={this.handleOpenPageDropdown}>Page</button>
                <ClickOutside onClickOutside={this.handleCloseDropdown}>
                  <div
                    className={cx('UserBar__item-dropdown', {
                      'UserBar__item--open': dropdownOpen === PAGE_DROPDOWN,
                    })}
                  >
                    <ul>
                      {page.items.map(item =>
                        <li>
                          <a href={item.link}>
                            {item.name}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </ClickOutside>
              </li>
            : null}

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

    return (
      <div className="Container UserBar__container">
        {isLoaded
          ? this.renderLoaded()
          : <ul className="UserBar__list" style={{ visibility: 'hidden' }}>
              <li className="UserBar__item UserBar__item">Loading</li>
            </ul>}
      </div>
    );
  }
}

export default Hydroleaf({
  className: 'UserBar',
})(UserBar);
