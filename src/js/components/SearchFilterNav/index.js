import React from 'react';
import cx from 'classnames';

function SearchFilterNav({ onSelect, value, options }) {
  return (
    <div className="SearchFilterNav">
      <ul className="SearchFilterNav__list">
        {options.map(option => (
          <li
            className={cx('SearchFilterNav__item', {
              'SearchFilterNav__item--current': value === option.key,
              'SearchFilterNav__item--empty': option.count <= 0,
            })}
            key={option.key}
            onClick={onSelect.bind(null, option.key)}
          >{option.title}</li>
        ))}
      </ul>
    </div>
  );
}

SearchFilterNav.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    count: React.PropTypes.number.isRequired,
  })).isRequired,
};

export default SearchFilterNav;
