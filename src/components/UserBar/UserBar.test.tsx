import React from 'react';
import renderer from 'react-test-renderer';

import UserBar from './index';

it('renders with an anchor', () => {
  const tree = renderer.create(<UserBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
