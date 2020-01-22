import React from 'react';
import { PaginationNavigation } from '../../../website/src/components/PaginationNavigation/index';

export default { title: 'Navigation|Pagination Navigation' };

export const First: React.FC = () => (
  <PaginationNavigation
    currentPage={1}
    onPageChange={() => ({})}
    totalPages={6}
  />
);

export const Middle: React.FC = () => (
  <PaginationNavigation
    currentPage={3}
    onPageChange={() => ({})}
    totalPages={6}
  />
);

export const Last: React.FC = () => (
  <PaginationNavigation
    currentPage={6}
    onPageChange={() => ({})}
    totalPages={6}
  />
);
