import { storiesOf } from '@storybook/react';
import { Storybase } from '../../../website/src/components/Storybase';
import { PaginationNavigation } from '../../../website/src/components/PaginationNavigation/index';

storiesOf('PaginationNavigation', module)
  .addDecorator(Storybase())
  .add('first', () => (
    <PaginationNavigation
      currentPage={1}
      onPageChange={() => ({})}
      totalPages={6}
    />
  ))
  .add('middle', () => (
    <PaginationNavigation
      currentPage={3}
      onPageChange={() => ({})}
      totalPages={6}
    />
  ))
  .add('last', () => (
    <PaginationNavigation
      currentPage={6}
      onPageChange={() => ({})}
      totalPages={6}
    />
  ));
