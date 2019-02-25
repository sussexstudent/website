import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import CookieMessage from './index';

it('renders a snapshot', () => {
  const { container } = render(<CookieMessage />);
  expect(container).toMatchSnapshot();
});

it('hides on close', () => {
  const { getByTestId, container } = render(<CookieMessage />);
  const closeButton = getByTestId('close');

  fireEvent.click(closeButton);

  expect(container.firstChild).toBeNull();
});
