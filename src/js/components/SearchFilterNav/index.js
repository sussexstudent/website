import React from 'react';
import cx from 'classnames';

const optionShape = React.PropTypes.shape({
  key: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  count: React.PropTypes.number.isRequired,
});

function SearchFilterItem({ currentValue, option, onSelect }) {
  const handleClick = onSelect.bind(null, option.key);
  return (
    <li
      className={cx('SearchFilterNav__item', {
        'SearchFilterNav__item--current': currentValue === option.key,
        'SearchFilterNav__item--disabled': option.count <= 0,
      })}
      key={option.key}
      onClick={option.count > 0 ? handleClick : () => {}}
    >{option.title}</li>
  );
}

SearchFilterItem.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  currentValue: React.PropTypes.string.isRequired,
  option: optionShape.isRequired,
};

function SearchFilterNav({ onSelect, value, options }) {
  return (
    <ul className="SearchFilterNav">
      {options.map(option => (
        <SearchFilterItem
          key={option.key}
          option={option}
          currentValue={value}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

SearchFilterNav.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.arrayOf(optionShape).isRequired,
};

export default SearchFilterNav;
