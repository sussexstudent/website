import React from 'react';
import cx from 'classnames';
import slugify from '~libs/slugify';
import { InternalAppLink } from '~components/InternalAppLink';

interface Section {
  anchor: string;
  to?: string;
  name: string;
  children: Section[];
}

interface IProps {
  title?: string;
  items: Section[];
  activeKey?: string;
  onlyShowSubMenuWhenChildActive?: boolean;
}

export function generateTitlesFromStream(body: any): Section[] {
  return body.map((block: any) => {
    // todo
    const heading = block.value.heading;
    return { name: heading, anchor: slugify(heading) };
  });
}

function canDisplaySubMenu(
  onlyShowSubMenuWhenChildActive: boolean,
  children: Section[],
  key: string,
) {
  if (!onlyShowSubMenuWhenChildActive) {
    return true;
  }

  return children.map((item) => item.anchor).indexOf(key) >= 0;
}

// TODO: Tidy this up. Should technically support unlimited levels
// TODO: this component's name doesn't match the css component
const ContentNavigation: React.SFC<IProps> = ({
  title,
  items,
  activeKey = '',
  onlyShowSubMenuWhenChildActive = false,
}) => {
  return (
    <div className="NavigationCard">
      <h3 className="NavigationCard__title">{title || 'Navigation'}</h3>
      <ul className="NavigationCard__list">
        {items.map((item) => (
          <li
            className={cx('NavigationCard__item', {
              'NavigationCard__item--active': item.anchor === activeKey,
            })}
          >
            {item.to !== undefined ? (
              <InternalAppLink to={item.to} className="NavigationCard__anchor">
                {item.name}
              </InternalAppLink>
            ) : (
              <a className="NavigationCard__anchor" href={`#${item.anchor}`}>
                {item.name}
              </a>
            )}
            {item.children &&
            item.children.length > 0 &&
            (canDisplaySubMenu(
              onlyShowSubMenuWhenChildActive,
              item.children,
              activeKey,
            ) ||
              item.anchor === activeKey) ? (
              <ul className="NavigationCard__sub-list">
                {item.children.map((itemInner) => (
                  <li
                    className={cx('NavigationCard__item', {
                      'NavigationCard__item--active':
                        itemInner.anchor === activeKey,
                    })}
                  >
                    {itemInner.to !== undefined ? (
                      <InternalAppLink
                        to={itemInner.to}
                        className="NavigationCard__anchor"
                      >
                        {itemInner.name}
                      </InternalAppLink>
                    ) : (
                      <a
                        className="NavigationCard__anchor"
                        href={`#${itemInner.anchor}`}
                      >
                        {itemInner.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentNavigation;
