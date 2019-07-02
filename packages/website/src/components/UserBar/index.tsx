import React, { useState, useCallback, useEffect } from 'react';
import cx from 'classnames';
import client, { ClientAuth } from '@ussu/common/src/libs/user';
import { WebsiteRootState } from '../../types/website';
import { useMappedState } from 'redux-react-hook';

enum DropdownState {
  Page,
  Admin,
}

interface UserBarState {
  isLoaded: boolean;
  dropdownOpen: DropdownState | null;
  auth: ClientAuth | null;
  greetingIndex: 0;
}

export const UserBar: React.FC = ({}) => {
  const [state, setState] = useState<UserBarState>({
    isLoaded: false,
    dropdownOpen: null,
    auth: null,
    greetingIndex: 0,
  });

  const handleToggleDropdown = useCallback(
    (dropdown: DropdownState) => () => {
      setState((state) => ({
        ...state,
        dropdownOpen: dropdown === state.dropdownOpen ? null : dropdown,
      }));
    },
    [],
  );

  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      page: state.page,
      user: state.user,
    }),
    [],
  );

  const {
    page: { menu },
    user: { isLoaded, isLoggedIn, profile, actionBound },
  } = useMappedState(mapState);

  useEffect(() => {
    setTimeout(() => {
      const { auth } = client || { auth: null };
      setState((state) => ({
        ...state,
        auth,
        isLoaded: true,
      }));
    }, 1);

    // trying to avoid using some sort of state container for now. hacky
    (window as any).emitter.on('changePageOptions', (_options: any) => {});
  }, []);

  if (!isLoaded) {
    return (
      <ul className="UserBar__list" style={{ visibility: 'hidden' }}>
        <li className="UserBar__item UserBar__item">Loading</li>
      </ul>
    );
  }

  const { dropdownOpen } = state;

  if (isLoggedIn && profile) {
    return (
      <ul className="UserBar__list">
        <li className="UserBar__item UserBar__item--welcome">
          Hi {profile.firstName}!
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
            <button
              onClick={handleToggleDropdown(DropdownState.Admin)}
              type="button"
            >
              Admin
            </button>
            {dropdownOpen === DropdownState.Admin ? (
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
            <button
              onClick={handleToggleDropdown(DropdownState.Page)}
              type="button"
            >
              Page
            </button>
            {dropdownOpen === DropdownState.Page ? (
              <div
                className={cx('UserBar__item-dropdown', {
                  'UserBar__item--open': dropdownOpen === DropdownState.Page,
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
};
