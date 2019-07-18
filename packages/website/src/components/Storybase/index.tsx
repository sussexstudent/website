import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ScrollToTop } from '../ScrollToTop';

export const Storybase = (url: string = '/') => (story: () => any) => (
  <MemoryRouter initialEntries={[url]}>
    <ScrollToTop>{story()}</ScrollToTop>
  </MemoryRouter>
);
