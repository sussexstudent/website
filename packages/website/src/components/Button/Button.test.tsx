import React from 'react';
import renderer from 'react-test-renderer';

import Button from './index';

it('renders', () => {
  const tree = renderer
    .create(<Button href="https://example.com/">Click here</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
