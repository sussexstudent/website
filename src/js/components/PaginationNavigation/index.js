import React from 'react';

function PaginationNavigation({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="PaginationNavigation">
      <button
        className="PaginationNavigation__button"
        type="button"
        tabIndex="-1"
        onClick={onPageChange.bind(null, currentPage - 1)}
        disabled={currentPage <= 1}
      >Previous</button>
      <span className="PaginationNavigation__meta">Page {currentPage} of {totalPages}</span>
      <button
        className="PaginationNavigation__button"
        type="button"
        tabIndex="-1"
        onClick={onPageChange.bind(null, currentPage + 1)}
        disabled={currentPage >= totalPages}
      >Next</button>
    </div>
  );
}

PaginationNavigation.propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  totalPages: React.PropTypes.number.isRequired,
  onPageChange: React.PropTypes.func.isRequired,
};

export default PaginationNavigation;
