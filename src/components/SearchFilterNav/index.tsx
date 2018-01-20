import React from 'react';
import cx from 'classnames';

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
}

function SearchFilterItem({
  currentValue,
  option,
  onSelect,
  itemKey,
}: IItemProps) {
  const handleClick = onSelect.bind(null, option.key);
  return (
    <li
      className={cx('SearchFilterNav__item', {
        'SearchFilterNav__item--current': currentValue === option.key,
        'SearchFilterNav__item--disabled': option.count <= 0,
      })}
      key={option.key}
      onClick={option.count > 0 ? handleClick : () => {}}
    >
      {option.title}
      {itemKey !== 'top' ? <span> ({option.count})</span> : null}
    </li>
  );
}

interface IProps {
  onSelect(key: any): void;
  value: any;
  options: Array<Option>;
}

function SearchFilterNav({ onSelect, value, options }: IProps) {
  return (
    <ul className="SearchFilterNav">
      {options.map((option) => (
        <SearchFilterItem
          key={option.key}
          itemKey={option.key}
          option={option}
          currentValue={value}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

export default SearchFilterNav;
