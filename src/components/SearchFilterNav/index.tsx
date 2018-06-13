import React from 'react';
import cx from 'classnames';
import qs from 'query-string';
import { NavLink } from 'react-router-dom';

interface Option {
  key: any;
  title: string;
  count: number;
}

interface IItemProps {
  onSelect(key: any): void;
  currentValue: any;
  itemKey: any;
  option: Option;
  query: string;
}

function SearchFilterItem(props: IItemProps) {
  const { currentValue, option, query, onSelect, itemKey } = props;
  const handleClick = onSelect.bind(null, option.key);

  const count = itemKey !== 'top' ? <span>{`(${option.count})`}</span> : null;

  return (
    <li
      className={cx('Sectionbar__menu-item', {
        'Sectionbar__menu-item--active': currentValue === option.key,
        'Sectionbar__menu-item--disabled': option.count <= 0,
      })}
      key={option.key}
      onClick={option.count > 0 ? handleClick : () => {}}
    >
      <NavLink
        to={`/search?${qs.stringify({ q: query, area: option.key })}`}
        exact
      >
        {option.title}
        {count}
      </NavLink>
    </li>
  );
}

interface IProps {
  onSelect(key: any): void;
  value: any;
  options: Option[];
  query: string;
}

function SearchFilterNav({ onSelect, value, options, query }: IProps) {
  return (
    <React.Fragment>
      {options.map((option) => (
        <SearchFilterItem
          key={option.key}
          itemKey={option.key}
          query={query}
          option={option}
          currentValue={value}
          onSelect={onSelect}
        />
      ))}
    </React.Fragment>
  );
}

export default SearchFilterNav;
