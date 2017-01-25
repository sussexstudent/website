import React from 'react';

function PaginationNavigation({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="PaginationNavigation">
      <button
        className="PaginationNavigation__button"
        tabIndex="-1"
        onClick={onPageChange.bind(null, currentPage - 1)}
        disabled={currentPage <= 1}
      >Previous</button>
      <span className="PaginationNavigation__meta">Page {currentPage} of {totalPages}</span>
      <button
        className="PaginationNavigation__button"
        tabIndex="-1"
        onClick={onPageChange.bind(null, currentPage + 1)}
        disabled={currentPage >= totalPages}
      >Next</button>
    </div>
  );
}

PaginationNavigation.propTypes = {
  currentPage: React.PropTypes.number,
  totalPages: React.PropTypes.number,
  onPageChange: React.PropTypes.func,
};

export default PaginationNavigation;
