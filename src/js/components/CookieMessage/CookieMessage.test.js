import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import CookieMessage from './index';

it('renders a snapshot', () => {
  const tree = renderer.create(<CookieMessage />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('hides on close', () => {
  const wrapper = shallow(<CookieMessage />);
  wrapper.find('button').simulate('click');
  expect(wrapper.type()).toBeFalsy();
});
