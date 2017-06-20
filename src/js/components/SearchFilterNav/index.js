import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const optionShape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

function SearchFilterItem({ currentValue, option, onSelect, itemKey }) {
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
      {option.title}{itemKey !== 'top' ? <span> ({option.count})</span> : null}
    </li>
  );
}

SearchFilterItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  currentValue: PropTypes.string.isRequired,
  option: optionShape.isRequired,
};

function SearchFilterNav({ onSelect, value, options }) {
  return (
    <ul className="SearchFilterNav">
      {options.map(option =>
        <SearchFilterItem
          key={option.key}
          itemKey={option.key}
          option={option}
          currentValue={value}
          onSelect={onSelect}
        />
      )}
    </ul>
  );
}

SearchFilterNav.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(optionShape).isRequired,
};

export default SearchFilterNav;
