import React, { useCallback } from 'react';
import cx from 'classnames';
import { MenuItem } from '~types/skeleton';
import { InternalAppLink } from '~components/InternalAppLink';

interface IPropsItem {
  name: string;
  link: string;
  active: boolean;
  onMouseOver: any;
  onMouseOut: any;
}

const LokiMenuItem = ({
  name,
  link,
  active,
  onMouseOver,
  onMouseOut,
}: IPropsItem) => (
  <li
    className="LokiMenu__item"
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
  >
    <InternalAppLink
      className={cx('LokiMenu__link', {
        'LokiMenu__link--active': active,
      })}
      to={link}
    >
      {name}
    </InternalAppLink>
  </li>
);

interface IProps {
  activeItem?: MenuItem | null;
  setCurrentHover(item: MenuItem | null): void;
}

export const LokiMenu = ({ activeItem, setCurrentHover }: IProps) => {
  const onOver = useCallback(
    (item: MenuItem) => (_e: any) => {
      setCurrentHover(item);
    },
    [],
  );
  const onOut = useCallback(
    (_item: MenuItem) => (_e: any) => {
      setCurrentHover(null);
    },
    [],
  );

  return (
    <nav className="LokiMenu">
      <ul className="LokiMenu__list">
        <LokiMenuItem
          onMouseOver={onOver(MenuItem.GetInvolved)}
          onMouseOut={onOut(MenuItem.GetInvolved)}
          name="Get involved"
          link="/get-involved/"
          active={activeItem === MenuItem.GetInvolved}
        />
        <LokiMenuItem
          onMouseOver={onOver(MenuItem.WhatsOn)}
          onMouseOut={onOut(MenuItem.WhatsOn)}
          name="What's on"
          link="/whats-on/"
          active={activeItem === MenuItem.WhatsOn}
        />
        <LokiMenuItem
          onMouseOver={onOver(MenuItem.Support)}
          onMouseOut={onOut(MenuItem.Support)}
          name="Support"
          link="/support/"
          active={activeItem === MenuItem.Support}
        />
        <LokiMenuItem
          onMouseOver={onOver(MenuItem.AboutUs)}
          onMouseOut={onOut(MenuItem.AboutUs)}
          name="About us"
          link="/about-us/"
          active={activeItem === MenuItem.AboutUs}
        />
      </ul>
    </nav>
  );
};
