import React from 'react';
import renderer from 'react-test-renderer';

import { BackBar } from './index';

it('renders a snapshot', () => {
  const tree = renderer
    .create(<BackBar href="https://example.com">All examples</BackBar>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('accepts colors', () => {
  const tree = renderer
    .create(
      <BackBar href="https://example.com" color="red">
        All examples
      </BackBar>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
