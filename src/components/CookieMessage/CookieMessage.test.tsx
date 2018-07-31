import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-testing-library';

import CookieMessage from './index';

it('renders a snapshot', () => {
  const tree = renderer.create(<CookieMessage />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('hides on close', () => {
  const { getByText, container } = render(<CookieMessage />);
  const closeButton = getByText('Close');

  fireEvent(closeButton, new MouseEvent('click'));

  expect(container.firstChild).toBeNull();
});
