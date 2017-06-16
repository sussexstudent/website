import React from 'react';
import cx from 'classnames';
import slugify from '../../libs/slugify';

export function generateTitlesFromStream(body) {
  return body.map(block => {
    const heading = block.value.heading;
    return { name: heading, anchor: slugify(heading) };
  });
}

// TODO: Tidy this up. Should technically support unlimited levels
// TODO: this component's name doesn't match the css component
function ContentNavigation({ items, activeKey }) {
  return (
    <div className="NavigationCard">
      <h3 className="NavigationCard__title">Navigation</h3>
      <ul className="NavigationCard__list">
        {items.map(item => (
          <li
            className={cx('NavigationCard__item', {
              'NavigationCard__item--active': item.anchor === activeKey,
            })}
          >
            <a className="NavigationCard__anchor" href={`#${item.anchor}`}>
              {item.name}
            </a>
            {item.children && item.children.length > 0
              ? <ul className="NavigationCard__sub-list">
                  {item.children.map(itemInner => (
                    <li
                      className={cx('NavigationCard__item', {
                        'NavigationCard__item--active': itemInner.anchor ===
                          activeKey,
                      })}
                    >
                      <a
                        className="NavigationCard__anchor"
                        href={`#${itemInner.anchor}`}
                      >
                        {itemInner.name}
                      </a>
                    </li>
                  ))}
                </ul>
              : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentNavigation;
