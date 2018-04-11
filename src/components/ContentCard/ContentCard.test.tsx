import React from 'react';
import renderer from 'react-test-renderer';

import ContentCard from './index';

it('renders with an anchor', () => {
  const tree = renderer
    .create(<ContentCard anchor="example"><h1>All examples</h1></ContentCard>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without anchor', () => {
  const tree = renderer
    .create(<ContentCard><h1>No anchor example</h1></ContentCard>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
