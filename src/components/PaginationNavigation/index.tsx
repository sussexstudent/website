import React from 'react';

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange(pageNumber: number): void;
}

function PaginationNavigation({ currentPage, totalPages, onPageChange }: IProps) {
  return (
    <div className="PaginationNavigation">
      <button
        className="PaginationNavigation__button"
        type="button"
        tabIndex={-1}
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
        tabIndex={-1}
        onClick={onPageChange.bind(null, currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationNavigation;
