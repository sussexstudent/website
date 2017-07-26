import React from 'react';
import PropTypes from 'prop-types';

function PaginationNavigation({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="PaginationNavigation">
      <button
        className="PaginationNavigation__button"
        type="button"
        tabIndex="-1"
        onClick={onPageChange.bind(null, currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span className="PaginationNavigation__meta">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="PaginationNavigation__button"
        type="button"
        tabIndex="-1"
        onClick={onPageChange.bind(null, currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

PaginationNavigation.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationNavigation;
