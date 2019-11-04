import { PaginationNavigation } from '../../../website/src/components/PaginationNavigation/index';

export default { title: 'Pagination Navigation' };

export const First = () => (
  <PaginationNavigation
    currentPage={1}
    onPageChange={() => ({})}
    totalPages={6}
  />
);

export const Middle = () => (
  <PaginationNavigation
    currentPage={3}
    onPageChange={() => ({})}
    totalPages={6}
  />
);

export const Last = () => (
  <PaginationNavigation
    currentPage={6}
    onPageChange={() => ({})}
    totalPages={6}
  />
);
