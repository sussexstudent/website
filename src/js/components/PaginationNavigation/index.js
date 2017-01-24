import React from 'react';

function PaginationNavigation(props) {
  return (
    <div className="PaginationNavigation">
      <a
        className="PaginationNavigation__button"
        tabIndex="-1"
        onClick={props.onPageChange.bind(null, props.currentPage - 1)}
      >Previous</a>
      <span className="PaginationNavigation__meta">Page {props.currentPage} of {props.totalPages}</span>
      <a
        className="PaginationNavigation__button"
        tabIndex="-1"
        onClick={props.onPageChange.bind(null, props.currentPage + 1)}
      >Next</a>
    </div>
  );
}

PaginationNavigation.propTypes = {
  currentPage: React.PropTypes.number,
  totalPages: React.PropTypes.number,
  onPageChange: React.PropTypes.func,
};

export default PaginationNavigation;
